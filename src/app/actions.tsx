"use server";

import clientPromise from "../lib/mongodb";

type ConnectionStatus = {
  isConnected: boolean;
};

export async function connect(): Promise<ConnectionStatus> {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      isConnected: true,
    };
  } catch (e) {
    console.error(e);
    return {
      isConnected: false,
    };
  }
}

export async function getExercises() {
  const client = await clientPromise;
  const exercises = client.db().collection("exercises");
  return await exercises.find().toArray();
}

export async function addExercise() {
  //
}
