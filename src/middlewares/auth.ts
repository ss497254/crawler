import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import httpStatus from "../constants/http-status";
import ApiError from "../lib/api-error";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.id && validate(req.session.id))
        return next();

    new ApiError(
        httpStatus.UNAUTHORIZED,
        "Please login to see this content"
    ).parse(res);

    return;
};
