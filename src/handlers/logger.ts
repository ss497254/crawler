import debug from "debug";
import { getEnvConfig } from "../config";

if (getEnvConfig("SHOW_LOGS")) debug.enable("*");

export const getLogger = (event: string) => {
    if (!getEnvConfig("SHOW_LOGS"))
        return {
            log: () => {},
            warn: () => {},
            error: () => {},
        };

    const debugError = debug(event + ":error");

    return {
        log: debug(event),
        warn: debug(event + ":warn"),
        error: (...args: any) => {
            let x = new Error().stack || "";
            x = x.split("\n")[2];

            args.push("\n" + x);
            debugError.apply(debugError, args);
        },
    };
};
