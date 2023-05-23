import { firestoreInstance } from "./setup";

// Collection operations
export const getCollections = async () => {
    return (await firestoreInstance.listCollections()).map((doc) => doc.id);
};

export const deleteCollection = (collectionName: string) => {
    return firestoreInstance.recursiveDelete(
        firestoreInstance.collection(collectionName)
    );
};

export const getCollectionData = async (collectionName: string) => {
    return (await firestoreInstance.collection(collectionName).get()).docs.map(
        (doc) => ({ ...doc.data(), id: doc.id })
    );
};

export const getItem = async (collectionName: string, docId: string) => {
    return (
        await firestoreInstance.collection(collectionName).where(docId).get()
    ).docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
};

export const addItem = (collectionName: string, data: any) => {
    return firestoreInstance.collection(collectionName).add(data);
};

export const updateItem = () => {
    // return firestoreInstance.send(());
};

export const deleteItem = () => {
    // return firestoreInstance.send(());
};
