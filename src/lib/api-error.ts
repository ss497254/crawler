import { Response } from "express";
import { getEnvConfig } from "../config";

export default class ApiError extends Error {
    statusCode = 500;
    message = "internal server error";
    origin = {} as any;

    constructor(statusCode: number, message: string, err?: Error) {
        super(message);
        this.statusCode = statusCode || this.statusCode;
        this.message = message || this.message;

        if (err) {
            this.origin.name = err.name;
            this.origin.message = err.message;
            this.origin.stack = err.stack;
            this.origin.err = err;
        }

        Error.captureStackTrace(this, this.constructor);
    }

    parse(res: Response) {
        return res.status(this.statusCode).json({
            success: false,
            message: this.message,
            ...(getEnvConfig("SHOW_API_ERRORS_DETAILS")
                ? {
                      stack: this.stack,
                      origin: this.origin,
                  }
                : {}),
        });
    }
}
