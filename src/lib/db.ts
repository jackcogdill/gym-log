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

export async function logExercise(user: User, log: ExerciseLog) {
  console.log('log exercise', log);
  try {
    const doc = await addDoc(
      collection(db, 'users', user.uid, 'exercises'),
      log,
    );
    console.log('Document written with ID:', doc.id);
  } catch (e) {
    console.error('Error adding document:', e);
  }
}
