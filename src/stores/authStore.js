import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            token: null,
            login: (user, token) =>
                set({ user: user, token: token, isAuthenticated: true }),
            logout: () =>
                set({ user: null, token: null, isAuthenticated: false })
        }),
        { name: "auth-storage" }
    )
)

export default useAuthStore
