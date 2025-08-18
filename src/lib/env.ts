// src/lib/env.ts
export const API_BASE =
  typeof window !== "undefined" ? window.location.origin : "";
