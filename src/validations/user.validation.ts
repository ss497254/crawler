import Joi from "joi";

export const userLoginAndRegister = {
    body: Joi.object()
        .keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
        .required(),
};
