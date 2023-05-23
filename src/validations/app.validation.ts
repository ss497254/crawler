import Joi from "joi";

const AppNameValidation = Joi.object()
    .keys({ appName: Joi.string().required() })
    .required();

export const getAppData = {
    params: AppNameValidation,
};

export const saveAppData = {
    params: AppNameValidation,
    body: Joi.object()
        .keys({
            data: Joi.object().required(),
        })
        .required(),
};
