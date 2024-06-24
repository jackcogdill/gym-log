'use client';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  AuthError,
} from 'firebase/auth';
import { auth } from './config';
import { isMobile } from 'react-device-detect';

export async function signIn() {
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

export function signOut() {
  auth.signOut();
}
