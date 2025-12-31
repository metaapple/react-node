import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // (선택) 앱 시작 시 로그인 상태 확인용
  // 현재 백엔드 /users/me 는 "message"만 반환 → user를 세팅하면 오히려 깨짐
  me: async () => {
    try {
      const res = await axios.get(`${API_URL}/users/me`, { withCredentials: true });

      // 백엔드에서 실제 사용자 객체를 주는 경우에만 아래를 사용
      // set({ user: res.data.user ?? res.data, error: null });

      return { success: true, data: res.data };
    } catch (e) {
      set({ user: null });
      return { success: false };
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `${API_URL}/users/login`,
        { username, password },
        { withCredentials: true }
      );

      // ★ 핵심 수정: 응답에서 user만 꺼내서 저장
      set({ user: res.data.user, loading: false, error: null });
      return { success: true };
    } catch (e) {
      // ★ 백엔드는 error 키를 내려줌: { error: "..." }
      const msg =
        e?.response?.data?.error ||
        e?.response?.data?.message ||
        "로그인에 실패했습니다.";
      set({ loading: false, error: String(msg) });
      return { success: false };
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      // 현재 백엔드에는 /users/logout 미구현 → 호출해도 의미 없음
      // await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
    } catch (e) {
      // 무시
    } finally {
      set({ user: null, loading: false, error: null });
    }
  },
}));
