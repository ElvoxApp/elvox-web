export const toTimestamptz = (dateObj, timeStr) => {
    const [time, meridiem] = timeStr.split(" ")
    let [hours, minutes] = time.split(":").map(Number)

    if (meridiem === "PM" && hours !== 12) hours += 12
    if (meridiem === "AM" && hours === 12) hours = 0

    const d = new Date(dateObj)
    d.setHours(hours, minutes, 0, 0)

    return d.toISOString()
}

export const fromTimestamptz = (isoString) => {
    const d = new Date(isoString)

    let hours = d.getHours()
    const minutes = d.getMinutes()
    const meridiem = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    if (hours === 0) hours = 12

    const time = `${hours}:${minutes.toString().padStart(2, "0")} ${meridiem}`

    const date = new Date(d)
    date.setHours(0, 0, 0, 0)

    return {
        date,
        time
    }
}

export const toEpoch = (dateObj, timeStr) => {
    if (!dateObj || !timeStr) return NaN
    return Date.parse(toTimestamptz(dateObj, timeStr))
}
