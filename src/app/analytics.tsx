"use client";

import { initAnalytics } from "../lib/firebase/config";
import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return <></>;
}
