"use client";

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError,
  User,
} from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});
const auth = getAuth(app);

async function signIn() {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
  } catch (e) {
    const error = e as AuthError;
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  }
}

const mainClassName = "min-h-screen p-20";
const buttonClassName =
  "p-1 rounded border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  });

  if (!user) {
    return (
      <main className={mainClassName}>
        <p>Please sign in:</p>
        <button className={buttonClassName} onClick={() => signIn()}>
          Sign In
        </button>
      </main>
    );
  }

  return (
    <main className={mainClassName}>
      <p>Welcome {user.displayName}!</p>
      <button className={buttonClassName} onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </main>
  );
}
