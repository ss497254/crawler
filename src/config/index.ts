import { config } from "dotenv";

export type envType = any;
export type envDetails = {
    type: "boolean" | "string" | "object" | "null" | "number";
    setBy: "default" | "environment" | "function";
    value: envType;
};

export const __prod__ = process.env.NODE_ENV === "production";

const cookieVariables = [
    "COOKIE_NAME",
    "COOKIE_SECRET",
    "COOKIE_SECURE",
    "COOKIE_SAMESITE",
    "COOKIE_DOMAIN",
    "COOKIE_MAXAGE",
] as const;

const firebaseVariable = [
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_PRIVATE_KEY",
];

const envVariables = [
    "PORT",
    "SERVER_LOCAL_IP",

    ...cookieVariables,
    ...firebaseVariable,

    "SHOW_LOGS",
    "USER_REGISTER_SECRET",
    "SHOW_API_ERRORS_DETAILS",
    "ENABLE_DEV_ROUTES",
] as const;

const env: Record<(typeof envVariables)[number], envDetails> = {
    PORT: { type: "number", setBy: "default", value: 8080 },
    SERVER_LOCAL_IP: {
        type: "string",
        setBy: "default",
        value: "127.0.0.1",
    },

    FIREBASE_CLIENT_EMAIL: { type: "string", setBy: "default", value: "" },
    FIREBASE_PROJECT_ID: { type: "string", setBy: "default", value: "" },
    FIREBASE_PRIVATE_KEY: { type: "string", setBy: "default", value: "" },

    COOKIE_NAME: { type: "string", setBy: "default", value: "nif" },
    COOKIE_DOMAIN: {
        type: "string",
        setBy: "default",
        value: "",
    },
    COOKIE_SAMESITE: { type: "string", setBy: "default", value: "lax" },
    COOKIE_SECRET: {
        type: "string",
        setBy: "default",
        value: "",
    },
    COOKIE_MAXAGE: {
        type: "number",
        setBy: "default",
        value: 1000 * 60 * 60 * 24 * 90,
    },
    COOKIE_SECURE: { type: "boolean", setBy: "default", value: true },

    GOOGLE_CLIENT_ID: {
        type: "string",
        setBy: "default",
        value: "",
    },
    GOOGLE_CLIENT_SECRET: {
        type: "string",
        setBy: "default",
        value: "",
    },
    GOOGLE_WEBSITE_REDIRECT_URL: {
        type: "string",
        setBy: "default",
        value: "",
    },
    GOOGLE_APP_REDIRECT_URL: {
        type: "string",
        setBy: "default",
        value: "",
    },

    SHOW_LOGS: { type: "boolean", setBy: "default", value: false },
    USER_REGISTER_SECRET: {
        type: "string",
        setBy: "default",
        value: "",
    },
    SHOW_API_ERRORS_DETAILS: {
        type: "boolean",
        setBy: "default",
        value: false,
    },
    ENABLE_DEV_ROUTES: { type: "boolean", setBy: "default", value: false },
};

const formatVariable = (
    value: string | any,
    type: envDetails["type"],
    variable: string
) => {
    let error = new Error(
        `Invalid Data type of ${variable}, it should be of type ${type}`
    );

    if (type === "string") return value.toString();

    if (type === "boolean") {
        if (value === "true" || value === true) return true;
        return false;
    }

    if (type === "number") {
        if (!isNaN(value as any)) return parseInt(value);
        throw error;
    }

    if (type === "object") {
        try {
            return JSON.stringify(value);
        } catch {
            throw error;
        }
    }

    throw error;
};

config();

for (let variable of envVariables) {
    let x = process.env[variable];

    if (!!x) {
        env[variable].value = formatVariable(x, env[variable].type, variable);
        env[variable].setBy = "environment";

        delete process.env[variable];
    } else if (!env[variable]) {
        env[variable].value = null;
    }
}

type InputType = (typeof envVariables)[number];

export const setEnvVariable = (input: InputType, value: envType) => {
    if (envVariables.indexOf(input) === -1) {
        throw new Error("Invalid Variable " + input);
    }

    env[input].value = value;
    env[input].setBy = "function";
};

export const getEnvConfig = (input: InputType): envType => {
    if (envVariables.indexOf(input) === -1) {
        throw new Error("Invalid Variable " + input);
    }

    return env[input].value;
};

export const getAllEnv = () => env;
