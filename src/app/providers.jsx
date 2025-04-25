import React from "react";
import AuthProvider from "@/providers/AuthProvider";
export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
