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
  AuthError,
  User,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

export default function Home() {
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

  if (!ready) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <p>Please sign in:</p>
        <Button variant="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      </main>
    );
  }

  return (
    <main>
      <p>Welcome {user.displayName}!</p>
      <Button variant="secondary" onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    </main>
  );
}
