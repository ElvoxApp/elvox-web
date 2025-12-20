function formatDate(dateStr, withTime = false) {
    return new Date(dateStr).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        ...(withTime && {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Kolkata"
        })
    })
}

export default formatDate
