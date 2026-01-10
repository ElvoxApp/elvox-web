import { create } from "zustand"

const useElectionStore = create((set) => ({
    election: {},
    setElection: (data) =>
        set((state) => ({
            election: {
                ...state.election,
                ...data
            }
        }))
}))

export default useElectionStore
