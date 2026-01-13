import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import FilterMenu from "./FilterMenu"
import Button from "./Button"
import { useElectionStore } from "../stores"

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
    PAST: { color: "text-gray-500", label: "PAST" }
}

const AuditLogsHeader = ({
    elections,
    setElectionId,
    electionId,
    timeRange,
    setTimeRange,
    logMode,
    setLogMode
}) => {
    const [status, setStatus] = useState("LIVE")

    const isNotMobile = useMediaQuery({ minWidth: 640 })

    const { election } = useElectionStore()

    useEffect(() => {
        if (electionId !== election.id) {
            setLogMode("past")
            setStatus("PAST")
        } else {
            setLogMode("live")
            setStatus("LIVE")
        }
    }, [electionId, election.id, setLogMode])

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-6 rounded-xl py-3 text-primary-light dark:text-primary-dark'>
                <div className='flex max-sm:flex-col sm:items-center justify-between flex-1 gap-6'>
                    <div className='flex justify-between items-center gap-4 relative'>
                        <FilterMenu
                            options={elections}
                            filter={electionId}
                            setFilter={setElectionId}
                            forLogs={true}
                        />
                        <p className='flex items-center gap-1 sm:hidden'>
                            <span className={statusConfig[status].color}>
                                ●
                            </span>
                            <span className='font-semibold text-sm'>
                                {statusConfig[status].label}
                            </span>
                        </p>
                    </div>
                    <div className='flex gap-3 max-sm:justify-between'>
                        <div className='flex items-center justify-between gap-3 flex-1 sm:contents'>
                            <div className='flex items-center'>
                                <Button
                                    text='PAST'
                                    className={`text-sm border border-gray-500 rounded-none py-2 px-3 text-primary-dark ${
                                        logMode === "past"
                                            ? "bg-accent"
                                            : "text-primary-light dark:text-primary-dark"
                                    }`}
                                    type='button'
                                    onClick={() => {
                                        setLogMode("past")
                                        setStatus("PAST")
                                    }}
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
                                    onClick={() => {
                                        setLogMode("live")
                                        setStatus("LIVE")
                                    }}
                                    animation={false}
                                    disabled={electionId !== election.id}
                                />
                            </div>
                            <div className='flex w-37 relative'>
                                <FilterMenu
                                    options={timeRanges}
                                    filter={timeRange}
                                    setFilter={setTimeRange}
                                    forLogs={true}
                                    showSelected={true}
                                />
                            </div>
                        </div>
                        <p className='flex items-center gap-1 max-sm:hidden'>
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
