import { create } from "zustand"

const useModalStore = create((set) => ({
    stack: [], // [{ id, onCloseRequest }]

    // Register a modal when it opens
    openModal: (id, onCloseRequest) =>
        set((s) => {
            if (s.stack.some((m) => m.id === id)) return s
            return {
                stack: [...s.stack, { id, onCloseRequest }]
            }
        }),

    // Remove a modal from stack (called by modal when it actually closes)
    removeModal: (id) =>
        set((s) => ({
            stack: s.stack.filter((m) => m.id !== id)
        })),

    // Request the top modal to close (doesn't remove it yet)
    requestCloseTopModal: () =>
        set((s) => {
            const top = s.stack[s.stack.length - 1]
            if (top) {
                top.onCloseRequest() // Just calls the handler, doesn't modify stack
            }
            return s // No state change here
        })
}))

export default useModalStore
