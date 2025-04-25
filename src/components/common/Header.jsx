"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return (
    <header className="bg-white shadow-sm border-b-1 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="ml-6 flex items-center space-x-4">
              <Link
                href={"/blogs"}
                className={`px-3 py-2 rounded-md text-sm font-medium text-blue-600 text-xl`}
              >
                코드잇로그
              </Link>
              {user && (
                <Link
                  href="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/profile"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  프로필
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="cursor-pointer ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
