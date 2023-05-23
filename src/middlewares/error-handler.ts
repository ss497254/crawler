import { NextFunction, Request, Response } from "express";
import httpStatus, { httpMessage } from "../constants/http-status";
import ApiError from "../lib/api-error";

function errorHandler(
    err: ApiError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    let error = err;

    if (!(err instanceof ApiError)) {
        error = new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            httpMessage[500],
            err
        );
    }

    //@ts-ignore
    return error.parse(res);
}

export default errorHandler;
