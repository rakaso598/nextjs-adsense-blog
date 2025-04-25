import { tokenFetch } from "@/lib/fetchClient";

export const userService = {
  // 사용자 정보 요청
  getMe: () => tokenFetch("/users/me"),
};
