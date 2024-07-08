'use client';

import { db } from './firebase/config';
import { User } from 'firebase/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

interface ExerciseLog {
  exercise: string;
  weight: number;
  sets: number[];
  note: string;
  timestamp: number;
}

/** @returns success */
export async function logExercise(
  user: User,
  log: ExerciseLog,
): Promise<boolean> {
  try {
    const exercises = collection(db, 'users', user.uid, 'exercises');
    const metadata = doc(db, 'users', user.uid, 'metadata', 'exercises');

    const addPromise = addDoc(exercises, log);
    const setPromise = setDoc(
      metadata,
      { names: arrayUnion(log.exercise) },
      { merge: true },
    );
    await Promise.all([addPromise, setPromise]);

    return true;
  } catch (e) {
    console.error('Error logging exercise:', e);
    return false;
  }
}

/** @returns list of logged exercise names */
export async function getExerciseNames(user: User): Promise<string[]> {
  const metadata = doc(db, 'users', user.uid, 'metadata', 'exercises');
  const snapshot = await getDoc(metadata);
  return snapshot.exists() ? snapshot.data().names : [];
}
