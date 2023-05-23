import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpStatus from "../constants/http-status";
import ApiError from "../lib/api-error";
import pickProperty from "../utils/pickProperty";

interface Schema {
    body?: Joi.ObjectSchema<any>;
    query?: Joi.ObjectSchema<any>;
    session?: Joi.ObjectSchema<any>;
    params?: Joi.ObjectSchema<any>;
}

const validate =
    (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
        const validSchema = pickProperty(schema, [
            "params",
            "query",
            "body",
            "session",
        ]);

        const object = pickProperty(req, Object.keys(validSchema));

        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: "key" }, abortEarly: false })
            .validate(object);

        if (error) {
            const errorMessage = error.details
                .map((details) => details.message)
                .join(", ");

            return new ApiError(
                httpStatus.BAD_REQUEST,
                errorMessage,
                error
            ).parse(res);
        }

        Object.assign(req, value);
        return next();
    };

export default validate;
