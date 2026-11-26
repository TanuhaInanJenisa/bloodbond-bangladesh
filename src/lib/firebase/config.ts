import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length > 5 &&
  !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID.includes("placeholder")
);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const currentApp = getFirebaseApp();
  if (!currentApp) return null;
  if (!authInstance) {
    authInstance = getAuth(currentApp);
  }
  return authInstance;
}

export function getFirebaseDb(): Firestore | null {
  const currentApp = getFirebaseApp();
  if (!currentApp) return null;
  if (!dbInstance) {
    dbInstance = getFirestore(currentApp);
  }
  return dbInstance;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const currentApp = getFirebaseApp();
  if (!currentApp) return null;
  if (!storageInstance) {
    storageInstance = getStorage(currentApp);
  }
  return storageInstance;
}
