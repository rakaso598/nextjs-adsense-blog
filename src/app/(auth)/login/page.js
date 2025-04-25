"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import AuthForm from "../../../components/auth/AuthForm";

export default function LoginPage() {
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleLogin(formData) {
    setErrorMsg("");

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setErrorMsg("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      await login(email, password);
      router.replace("/blogs");
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

      {errorMsg && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{errorMsg}</p>
        </div>
      )}
      <AuthForm type="login" handleAuth={handleLogin} />
    </div>
  );
}
