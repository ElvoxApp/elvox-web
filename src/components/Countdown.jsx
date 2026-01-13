import { useElectionStore } from "../stores"
import useCountdown from "../hooks/useCountdown"

const labelMap = {
    draft: "Nominations open in",
    nominations: "Nominations close in",
    "pre-voting": "Voting starts in",
    voting: "Voting ends in",
    "post-voting": "Election closes in"
}

const getTargetTime = (election) => {
    switch (election.status) {
        case "draft":
            return election.nomination_start
        case "nominations":
            return election.nomination_end
        case "pre-voting":
            return election.voting_start
        case "voting":
            return election.voting_end
        case "post-voting":
            return election.election_end
        default:
            return null
    }
}

// Add leading zero for single-digit time values
const pad = (n) => String(n).padStart(2, "0")

const Countdown = ({ className }) => {
    const { election } = useElectionStore()

    const targetTime = getTargetTime(election)
    const timeLeft = useCountdown(targetTime)

    if (!timeLeft) return null

    const seconds = Math.floor(timeLeft / 1000) % 60
    const minutes = Math.floor(timeLeft / (1000 * 60)) % 60
    const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

    return (
        <div
            className={`flex itesms-center gap-1 text-primary-light dark:text-primary-dark ${className}`}
        >
            <p>{labelMap[election.status]}</p>
            {days > 0 ? (
                <p className='flex itemss-center gap-1'>
                    <span>
                        {days} {days === 1 ? "day" : "days"}
                    </span>
                    <span>
                        {hours} {hours === 1 ? "hour" : "hours"}
                    </span>
                </p>
            ) : (
                <p className='flex itemss-center gap-1'>
                    {pad(hours)}:{pad(minutes)}:{pad(seconds)}
                </p>
            )}
        </div>
    )
}

export default Countdown
