import { Request, Response } from "express";
import { appService } from "../services";
import httpStatus from "../constants/http-status";
import ApiError from "../lib/api-error";

export const getAppData = async (req: Request, res: Response) => {
    const { appName } = req.params;

    try {
        const data = await appService.getAppData(appName);
        res.send({ success: true, data });
    } catch (e) {
        new ApiError(httpStatus.BAD_REQUEST, "unable to get app data", e).parse(
            res
        );
    }
};

export const saveAppData = async (req: Request, res: Response) => {
    const { appName } = req.params;
    const { data } = req.body;

    try {
        const output = await appService.saveAppData(appName, data);
        res.send({ success: true, output });
    } catch (e) {
        new ApiError(
            httpStatus.BAD_REQUEST,
            "unable to save app data",
            e
        ).parse(res);
    }
};
