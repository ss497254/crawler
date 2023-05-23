import bcrypt from "bcryptjs";
import { addItem, getItem } from "../database/functions";
import { UserType } from "../types/UserType";

const TableName = "users";

export const getUserByUserName = async (username: string) => {
    const result: any = await getItem(TableName, username);

    return result as UserType;
};

export const getUserByUserNameAndPassword = async (
    username: string,
    password: string
) => {
    const user = await getUserByUserName(username);
    if (await bcrypt.compare(password, user.password)) return user;

    throw new Error("password not match");
};

export const addUser = async (username: string, password: string) => {
    password = await bcrypt.hash(password, 4);

    return await addItem(TableName, { username, password });
};
