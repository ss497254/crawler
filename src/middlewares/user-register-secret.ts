import { getEnvConfig } from "../config";
import { NextFunction, Request, Response } from "express";

export const userRegisterSecret = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        req.params.secret &&
        req.params.secret === getEnvConfig("USER_REGISTER_SECRET")
    )
        return next();

    res.status(404).json({ success: false, message: "Route Not Found" });
    return;
};
