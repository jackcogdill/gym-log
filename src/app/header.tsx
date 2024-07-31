"use client";

import Button from "react-bootstrap/Button";
import Link from "next/link";
import { signOut } from "../lib/firebase/auth";
import { useAuth } from "../lib/context/auth";

export default function Header() {
  const { user } = useAuth();
  return (
    <div className="container d-flex align-items-center justify-content-between">
      <Link
        href={"/"}
        style={{ color: "inherit", textDecoration: "none" }}
        className="fs-5"
      >
        Gym Log
      </Link>
      <div className="flex-grow-1"></div>
      {user!.displayName}
      <Button variant="secondary" size="sm" className="ms-2" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
