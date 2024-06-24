"use client";

import "./styles.scss";
import Button from "react-bootstrap/Button";
import Header from "./header";
import { signIn } from "../lib/firebase/actions";
import { useAuth } from "../lib/context/auth";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  if (!user || loading) {
    return (
      <main className="h-100 container py-4">
        <div className="h-25"></div>
        <div className="d-flex flex-column align-items-center gap-2">
          <h1>Gym Log</h1>
          {loading ? null : (
            <Button variant="primary" onClick={signIn}>
              Sign In with Google
            </Button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="h-100 container py-4">
      <Header />
      {children}
    </main>
  );
}
