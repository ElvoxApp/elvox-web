import { create } from "zustand"
import api from "../api/api"

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    isUserLoaded: false,

    login: (user) => set({ user, isAuthenticated: true, isUserLoaded: true }),
    logout: async () => {
        await api.post("/auth/logout")
        set({ user: null, isAuthenticated: false, isUserLoaded: true })
    },
    fetchMe: async () => {
        try {
            const res = await api.get("/auth/me")
            const user = res.data

            set({
                user,
                isAuthenticated: true,
                isUserLoaded: true
            })
        } catch {
            set({
                user: null,
                isAuthenticated: false,
                isUserLoaded: true
            })
        }
    }
}))

export default useAuthStore
