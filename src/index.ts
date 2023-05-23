require("./config");
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getEnvConfig } from "./config";
import { origin } from "./constants/allowed-cors-origin";
import { intializeDBConn } from "./database/setup";
import { getLogger } from "./handlers/logger";
import errorHandler from "./middlewares/error-handler";
import { SetupRoutes } from "./routes";
import { removeAccessToken } from "./utils/UseAccessToken";

const app = express();

const logger = getLogger("server");
const port = getEnvConfig("PORT");

async function bootstrap() {
    await intializeDBConn();

    app.set("x-powered-by", false);
    app.set("trust proxy", 1);
    app.use(cookieParser());
    app.use(
        cors({
            origin,
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // request logging and cookie processing
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        const token =
            req.cookies[getEnvConfig("COOKIE_NAME") as string] ||
            req.headers.authorization;

        logger.log(
            req.hostname,
            req.path,
            req.body,
            req.query,
            req.params,
            token ? "token" : "no-token"
        );

        // rejecting invalid requests in production
        // if (__prod__ && !AllowedHosts.includes(req.hostname))
        //     return res.sendStatus(404);

        if (!token) {
            return next();
        }

        try {
            const payload = verify(
                token,
                getEnvConfig("COOKIE_SECRET") as string,
                {
                    algorithms: ["HS256"],
                }
            ) as any;

            req.session = { id: payload.id } as any;
        } catch (err) {
            removeAccessToken(res);
        }

        return next();
    });

    SetupRoutes(app);

    app.use(errorHandler);

    app.use((_, res) => {
        res.status(404).json({ success: false, message: "Route Not Found" });
    });

    app.listen(port, () => {
        console.log(
            "\x1b[32m\x1b[1m\nSERVER STARTED!\n     ProcessID:",
            process.pid,
            "\x1b[0m",
            "\x1b[1m",
            `\n     URL: http://localhost:${port} \n`,
            "\x1b[0m"
        );
    });
}

(async () => {
    try {
        await bootstrap();
    } catch (e: any) {
        console.error("Server: error on launch\n", e.stack);
    }
})();
