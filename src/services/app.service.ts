import { addItem, getCollectionData } from "../database/functions";

export const getAppData = async (appName: string) => {
    return await getCollectionData(appName);
};

export const saveAppData = async (appName: string, data: any) => {
    return await addItem(appName, data);
};
