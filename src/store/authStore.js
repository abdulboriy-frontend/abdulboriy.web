import { create } from "zustand";

const saved = JSON.parse(localStorage.getItem("auth")) || {};

export const useAuthStore = create((set) => ({
  isAuth: saved.isAuth || false,

  email: saved.email || "",

  id: saved.id || "",

  name: saved.name || "",

  accessToken: saved.accessToken || "",

  setUser: (user) => {
    localStorage.setItem("auth", JSON.stringify(user));

    localStorage.setItem("accessToken", user.accessToken || "");

    set(user);
  },
}));