export const toTimestamptz = (dateObj, timeStr) => {
    const [time, meridiem] = timeStr.split(" ")
    let [hours, minutes] = time.split(":").map(Number)

    if (meridiem === "PM" && hours !== 12) hours += 12
    if (meridiem === "AM" && hours === 12) hours = 0

    const d = new Date(dateObj)
    d.setHours(hours, minutes, 0, 0)

    return d.toISOString()
}

export const toEpoch = (dateObj, timeStr) => {
    if (!dateObj || !timeStr) return NaN
    return Date.parse(toTimestamptz(dateObj, timeStr))
}
