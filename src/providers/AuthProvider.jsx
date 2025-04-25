"use client";

import { authService } from "@/lib/service/authService";
import { userService } from "@/lib/service/userService";
import { getTokenFromCookie, setTokensToCookie } from "@/utils/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  updateUser: () => {},
  register: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const userData = await userService.getMe();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    // 회원가입 성공 시 유저데이터를 API 에서 응답해주는 경우, 즉시 로그인 처리 가능
    const userData = await authService.register(
      nickname,
      email,
      password,
      passwordConfirmation,
    );

    // 토큰 저장 로직 추가
    if (userData.accessToken && userData.refreshToken) {
      setTokensToCookie(userData.accessToken, userData.refreshToken);
    }
    setUser(userData.user);
  };

  const login = async (email, password) => {
    // 로그인 성공 시 유저데이터를 API 에서 응답해주는 경우, 유저 상태 변경
    const userData = await authService.login(email, password);
    // 토큰 저장 로직 추가
    if (userData.accessToken && userData.refreshToken) {
      console.log("userData in login", userData);
      setTokensToCookie(userData.accessToken, userData.refreshToken);
    }

    setUser(userData.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
      // 쿠키 삭제
      document.cookie = "accessToken=; path=/; max-age=0; SameSite=Strict";
      document.cookie = "refreshToken=; path=/; max-age=0; SameSite=Strict";
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    // 웹페이지 랜딩 또는 새로고침 시 마다 서버에서 유저 데이터 동기화
    async function fetchUser() {
      const token = await getTokenFromCookie();
      if (token) {
        getUser().then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
