import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import FilterMenu from "./FilterMenu"
import Button from "./Button"

const timeRanges = [
    { label: "Last 1 hour", value: "last_1_hour" },
    { label: "Last 24 hours", value: "last_24_hours" },
    { label: "Last 7 days", value: "last_7_days" },
    { label: "Election period", value: "election_period" }
]

const statusConfig = {
    LIVE: { color: "text-green-500", label: "LIVE" },
    DISCONNECTED: { color: "text-red-500", label: "Disconnected" },
    RECONNECTING: { color: "text-yellow-500", label: "Reconnecting…" },
    PAST: { color: "text-gray-500", label: "Viewing past logs" }
}

const AuditLogsHeader = ({
    elections,
    setElectionId,
    electionId,
    timeRange,
    setTimeRange
}) => {
    const [logMode, setLogMode] = useState("live")
    const [status, setStatus] = useState("LIVE")

    const isNotMobile = useMediaQuery({ minWidth: 640 })

    return (
        <div className='flex flex-col gap-4 min-w-0'>
            <div className='flex items-center justify-between gap-6 min-w-0 rounded-xl py-3 text-primary-light dark:text-primary-dark'>
                <div className='flex max-sm:flex-col sm:items-center justify-between flex-1 gap-6 min-w-0'>
                    <div className='flex relative'>
                        <FilterMenu
                            options={elections}
                            filter={electionId}
                            setFilter={setElectionId}
                            forLogs={true}
                        />
                    </div>
                    <div className='flex gap-3 min-w-0 max-sm:justify-between'>
                        <div className='flex items-center gap-3 sm:contents min-w-0'>
                            <div className='flex items-center min-w-0'>
                                <Button
                                    text='PAST'
                                    className={`text-sm border border-gray-500 rounded-none py-2 px-3 text-primary-dark ${
                                        logMode === "past"
                                            ? "bg-accent"
                                            : "text-primary-light dark:text-primary-dark"
                                    }`}
                                    type='button'
                                    onClick={() => setLogMode("past")}
                                    animation={false}
                                />
                                <Button
                                    text='LIVE'
                                    className={`text-sm border border-gray-500 rounded-none py-2 px-3 text-primary-dark ${
                                        logMode === "live"
                                            ? "bg-accent"
                                            : "text-primary-light dark:text-primary-dark"
                                    }`}
                                    type='button'
                                    onClick={() => setLogMode("live")}
                                    animation={false}
                                />
                            </div>
                            <div className='flex relative sm:w-37 flex-none'>
                                <FilterMenu
                                    options={timeRanges}
                                    filter={timeRange}
                                    setFilter={setTimeRange}
                                    forLogs={true}
                                    showSelected={isNotMobile}
                                    label={isNotMobile ? "" : "Time range"}
                                />
                            </div>
                        </div>
                        <p className='flex items-center gap-1'>
                            <span className={statusConfig[status].color}>
                                ●
                            </span>
                            <span className='font-semibold text-sm'>
                                {statusConfig[status].label}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuditLogsHeader
