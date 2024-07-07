'use client';

import { db } from './firebase/config';
import { User } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

interface ExerciseLog {
  exercise: string;
  weight: number;
  sets: number[];
  note: string;
}

/** @returns success */
export async function logExercise(
  user: User,
  log: ExerciseLog,
): Promise<boolean> {
  console.log('log exercise', log);
  try {
    await addDoc(collection(db, 'users', user.uid, 'exercises'), log);
    return true;
  } catch (e) {
    console.error('Error adding document:', e);
    return false;
  }
}
