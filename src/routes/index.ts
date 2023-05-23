import { Router } from "express";
import { getEnvConfig } from "../config";
import appRoute from "./app.route";
import developmentRoute from "./development.route";
import userRoute from "./user.route";

const defaultAPIRoutes = [appRoute, userRoute];

const hiddenRoutes = [developmentRoute];

export const SetupRoutes = (router: Router) => {
    defaultAPIRoutes.forEach((route) => {
        router.use("/api", route);
    });

    if (getEnvConfig("ENABLE_DEV_ROUTES")) {
        hiddenRoutes.forEach((route) => {
            router.use("/very-difficult-to-find", route);
        });
    }
};
