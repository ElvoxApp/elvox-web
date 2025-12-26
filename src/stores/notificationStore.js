import { create } from "zustand"

const useNotificationStore = create((set) => ({
    notifications: [],
    unread: 0,

    setNotifications: (data) =>
        set({
            notifications: data,
            unread: data.filter((n) => !n.is_read).length
        }),

    markRead: (id) =>
        set((state) => {
            const notifications = state.notifications.map((n) =>
                n.id === id ? { ...n, is_read: true } : n
            )

            return {
                notifications,
                unread: notifications.filter((n) => !n.is_read).length
            }
        })
}))

export default useNotificationStore
