import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            token: null,
            hasHydrated: false,
            login: (user, token) =>
                set({ user: user, token: token, isAuthenticated: true }),
            logout: () =>
                set({ user: null, token: null, isAuthenticated: false }),
            setHasHydrated: (state) => set({ hasHydrated: state })
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        state.setHasHydrated(true)
                    } else {
                        state.setHasHydrated(true)
                    }
                }
            }
        }
    )
)

export default useAuthStore
