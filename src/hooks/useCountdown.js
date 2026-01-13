import { useEffect, useState } from "react"

const useCountdown = (targetTime) => {
    const [timeLeft, setTimeLeft] = useState(null)

    useEffect(() => {
        if (!targetTime) return

        const tick = () => {
            const diff = new Date(targetTime) - Date.now()
            setTimeLeft(diff > 0 ? diff : 0)
        }

        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [targetTime])

    return timeLeft
}

export default useCountdown
