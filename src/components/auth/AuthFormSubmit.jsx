"use client";

import LabelAndInput from "@/components/ui/LabelAndInput";
import Link from "next/link";
import React from "react";

export default function AuthFormSubmit({ type, handleAuth }) {
  return (
    <form onSubmit={handleAuth}>
      {type === "signup" && (
        <LabelAndInput
          label="닉네임"
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
        />
      )}
      <LabelAndInput
        label="이메일"
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요."
      />
      <LabelAndInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
      />
      {type === "signup" && (
        <LabelAndInput
          label="비밀번호 확인"
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 입력해주세요."
        />
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {type === "signup" ? "회원가입" : "로그인"}
        </button>
        <Link
          href={type === "signup" ? "/login" : "/signup"}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          {type === "signup" ? "로그인" : "회원가입"}
        </Link>
      </div>
    </form>
  );
}
