"use server";

import clientPromise from "../lib/mongodb";
import { ConnectionStatus } from "../lib/types";

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

    return ConnectionStatus.CONNECTED;
  } catch (e) {
    console.error(e);
    return ConnectionStatus.DISCONNECTED;
  }
}

export async function getExercises() {
  console.log("fetching...");
  const client = await clientPromise;
  const exercises = client.db().collection("exercises");
  const result = await exercises.find().toArray();
  console.log("result:", result);
}

export async function addExercise() {
  //
}
