"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function StartButton() {
  const { user } = useAuth();
  return (
    <div className="inline-flex rounded-md shadow">
      <Link
        href={user ? "/blogs" : "/login"}
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {user ? "시작하기" : "로그인하기"}
      </Link>
    </div>
  );
}
