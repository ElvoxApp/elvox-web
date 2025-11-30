import { create } from "zustand"

const useElectionStore = create(
    () => ({
        electionDetails: {
            title: "College Union Election 2025",
            status: "Voting Day (Active)",
            start: "November 8, 2025",
            end: "November 20, 2025",
            totalCandidates: 45,
            eligibleVoters: 3000
        }
    }),
    { name: "election-storage" }
)

export default useElectionStore
