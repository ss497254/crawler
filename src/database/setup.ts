import { cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { ServiceAccount } from "firebase-admin";
import { getEnvConfig } from "../config";

export let firestoreInstance: Firestore;

export const serviceAccount: ServiceAccount = {
    clientEmail: getEnvConfig("FIREBASE_CLIENT_EMAIL"),
    projectId: getEnvConfig("FIREBASE_PROJECT_ID"),
    privateKey: getEnvConfig("FIREBASE_PRIVATE_KEY"),
};

export const intializeDBConn = () => {
    const apps = getApps();

    if (apps.length === 0) {
        apps.push(
            initializeApp({ credential: cert(serviceAccount) }, "crawler")
        );
    }

    firestoreInstance = getFirestore(apps[0]);
};
