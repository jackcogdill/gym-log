"use client";

import Login from "./login";
import { useAuth } from "../lib/context/auth";

export default function Protected({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  if (!user || loading) {
    return <Login />;
  }

  return children;
}
