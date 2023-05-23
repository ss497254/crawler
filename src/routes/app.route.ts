import express from "express";
import validate from "../middlewares/validate";
import { auth } from "../middlewares/auth";
import { appValidation } from "../validations";
import { appController } from "../controllers";

const router = express.Router();

router
    .route("/:appName/get-app-data")
    .get(auth, validate(appValidation.getAppData), appController.getAppData);

router
    .route("/:appName/save-app-data")
    .post(auth, validate(appValidation.saveAppData), appController.saveAppData);

export default router;
