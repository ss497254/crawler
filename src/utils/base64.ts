export const btoa = (x: string) => Buffer.from(x, "utf-8").toString("base64");

export const atob = (x: string) => Buffer.from(x, "base64").toString();
