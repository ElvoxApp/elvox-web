import { create } from "zustand"

const useElectionStore = create((set) => ({
    election: {},
    setElection: (data) => set({ election: data })
}))

export default useElectionStore
