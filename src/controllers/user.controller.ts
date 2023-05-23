import { Request, Response } from "express";
import httpStatus from "../constants/http-status";
import ApiError from "../lib/api-error";
import { userService } from "../services";
import { createAccessToken, sendAccessToken } from "../utils/UseAccessToken";

export const userLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const { id } = await userService.getUserByUserNameAndPassword(
            username,
            password
        );

        const token = createAccessToken({ id });

        sendAccessToken(res, token);

        res.status(httpStatus.OK).send({
            success: true,
            message: "Login successful",
            data: { token },
        });
    } catch (e) {
        new ApiError(httpStatus.BAD_REQUEST, "unable to login user", e).parse(
            res
        );
    }
};

export const userRegister = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const data = await userService.addUser(username, password);

        res.status(httpStatus.CREATED).send({
            success: true,
            message: "register successful",
            data,
        });
    } catch (e) {
        new ApiError(
            httpStatus.BAD_REQUEST,
            "unable to register user",
            e
        ).parse(res);
    }
};

export const userLoggedIn = async (_req: Request, res: Response) => {
    res.json({ success: true, message: "You are logged in" });
};
