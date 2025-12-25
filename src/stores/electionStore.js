import { create } from "zustand"

const useElectionStore = create((set) => ({
    elections: [],
    setElections: (data) => set({ elections: data })
}))

export default useElectionStore
