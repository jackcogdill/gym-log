import { connect } from "./actions";

export default async function Home() {
  const { isConnected } = await connect();
  const statusClass = isConnected ? "bg-green-500" : "bg-red-500";
  return (
    <main className="min-h-screen p-24">
      <input
        type="text"
        placeholder="Exercise"
        className="w-full p-4 rounded border border-neutral-200 bg-neutral-50 outline-none dark:bg-neutral-900 dark:border-neutral-700"
      ></input>
      <div
        className={`${statusClass} absolute bottom-10 right-10 rounded-full w-10 h-10`}
      ></div>
    </main>
  );
}
