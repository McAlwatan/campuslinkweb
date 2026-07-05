import { create } from "zustand";

interface User {
  id: string;
  email: string;
  full_name: string;
  bio: string | null;
  avatar_url: string | null;
  university_id: string | null;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,

  setAuth: (user, accessToken, refreshToken) => {
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    set({ user, accessToken });
  },

  logout: () => {
    sessionStorage.clear();
    set({ user: null, accessToken: null });
    window.location.href = "/login";
  },
}));