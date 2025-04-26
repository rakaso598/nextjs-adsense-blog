"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import AuthFormSubmit from "@/components/auth/AuthFormSubmit";
import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  const { register } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSignup(formData) {
    setErrorMsg("");
    // 비밀번호 일치 여부 확인
    const nickname = formData.get("nickname");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await register(nickname, email, password, confirmPassword);

      // 회원가입 성공 후 로그인 페이지로 이동
      router.replace("/blogs");
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
      {errorMsg && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{errorMsg}</p>
        </div>
      )}
      <AuthForm type="signup" handleAuth={handleSignup} />
    </div>
  );
}
