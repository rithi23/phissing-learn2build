"use client";

import { useEffect } from "react";
import { getOrCreateSessionId } from "@/lib/session";

export function SessionInit() {
  useEffect(() => {
    getOrCreateSessionId();
  }, []);

  return null;
}
