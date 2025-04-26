"use client";

import { userService } from "@/lib/service/userService";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await userService.getMe();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        role="alert"
      >
        <p className="font-bold">오류 발생</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">내 프로필</h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 min-w-[80vw]">
          <div className="mb-4">
            <p className="text-gray-700 text-sm font-bold mb-1">이름</p>
            <p className="text-gray-900">{user.nickname}</p>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-4">
            <p className="text-sm text-gray-500">
              가입일: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
