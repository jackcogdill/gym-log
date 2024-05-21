"use client";

import "./styles.scss";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  AuthError,
  User,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { isMobile } from "react-device-detect";

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
const db = getFirestore(app);

async function signIn() {
  try {
    if (isMobile) {
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } else {
      await signInWithPopup(auth, new GoogleAuthProvider());
    }
  } catch (e) {
    const error = e as AuthError;
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

async function addTestDoc(user: User) {
  try {
    const docRef = await addDoc(collection(db, "users", user.uid, "info"), {
      email: user.email,
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

export default function Page() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.authStateReady().then(() => setReady(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        addTestDoc(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!ready) return;

  if (!user) {
    return (
      <div className="h-75 d-flex flex-column align-items-center justify-content-center gap-2">
        <h1>Gym Log</h1>
        <Button variant="primary" onClick={() => signIn()}>
          Sign In with Google
        </Button>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-end">
      {user.displayName}
      <Button
        variant="secondary"
        size="sm"
        className="ms-2"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
}
