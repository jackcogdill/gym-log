"use client";

import { ConnectionStatus } from "../lib/types";
import { connect, getExercises } from "./actions";
import { useState, useEffect } from "react";

function getStatusClass(status: ConnectionStatus): string {
  switch (status) {
    case ConnectionStatus.PENDING:
      return "bg-gray-500";
    case ConnectionStatus.CONNECTED:
      return "bg-green-500";
    case ConnectionStatus.DISCONNECTED:
      return "bg-red-500";
  }
}

export default function Home() {
  const [status, setStatus] = useState(ConnectionStatus.PENDING);

  useEffect(() => {
    connect().then(setStatus);
  });

  return (
    <main className="min-h-screen p-24">
      <form action={getExercises}>
        <input
          type="text"
          placeholder="Exercise"
          className="w-full p-4 rounded border border-neutral-200 bg-neutral-50 outline-none dark:bg-neutral-900 dark:border-neutral-700"
        ></input>
      </form>
      <div
        className={`${getStatusClass(status)} absolute bottom-10 right-10 rounded-full w-10 h-10`}
      ></div>
    </main>
  );
}
