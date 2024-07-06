"use client";

import Button from "react-bootstrap/Button";
import { signIn } from "../lib/firebase/auth";
import { useAuth } from "../lib/context/auth";

export default function Login() {
  const { loading } = useAuth();
  return (
    <>
      <div className="h-25"></div>
      <div className="d-flex flex-column align-items-center gap-2">
        <h1>Gym Log</h1>
        {loading ? null : (
          <Button variant="primary" onClick={signIn}>
            Sign In with Google
          </Button>
        )}
      </div>
    </>
  );
}
