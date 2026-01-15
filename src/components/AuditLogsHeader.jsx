import FilterMenu from "./FilterMenu"
import Button from "./Button"
import { useElectionStore } from "../stores"

const timeRanges = [
    { label: "Last 1 hour", value: "1_hour" },
    { label: "Last 24 hours", value: "24_hours" },
    { label: "Last 7 days", value: "7_days" },
    { label: "Election period", value: "election_period" }
]

const statusConfig = {
    connected: { color: "text-green-500", label: "LIVE" },
    disconnected: { color: "text-red-500", label: "Disconnected" },
    connecting: { color: "text-yellow-500", label: "Connecting…" }
}

const AuditLogsHeader = ({
    elections,
    setElectionId,
    electionId,
    timeRange,
    setTimeRange,
    logMode,
    setLogMode,
    sseRef,
    status
}) => {
    const { election } = useElectionStore()

    return (
        <div className='flex flex-col pt-3'>
            <div className='flex items-center justify-between gap-6 rounded-xl text-primary-light dark:text-primary-dark'>
                <div className='flex max-sm:flex-col sm:items-center justify-between flex-1 gap-1.5'>
                    <div className='flex relative'>
                        <FilterMenu
                            options={elections}
                            filter={electionId}
                            setFilter={setElectionId}
                            forLogs={true}
                        />
                    </div>
                    <div className='flex gap-3 max-sm:justify-between'>
                        <div className='flex items-center justify-between gap-3 flex-1 sm:contents'>
                            <div className='flex items-center max-sm:flex-1'>
                                <Button
                                    text='PAST'
                                    className={`text-sm border border-gray-500 rounded-none py-2 px-3 text-primary-dark max-sm:flex-1 ${
                                        logMode === "past"
                                            ? "bg-accent"
                                            : "text-primary-light dark:text-primary-dark"
                                    }`}
                                    type='button'
                                    onClick={() => {
                                        setLogMode("past")
                                        sseRef.current.close()
                                        sseRef.current = null
                                    }}
                                    animation={false}
                                />
                                <Button
                                    text='LIVE'
                                    className={`text-sm border border-gray-500 rounded-none py-2 px-3 text-primary-dark max-sm:flex-1 ${
                                        logMode === "live"
                                            ? "bg-accent"
                                            : "text-primary-light dark:text-primary-dark"
                                    }`}
                                    type='button'
                                    onClick={() => {
                                        setLogMode("live")
                                    }}
                                    animation={false}
                                    disabled={electionId !== election.id}
                                />
                            </div>
                            <div className='flex w-37 max-sm:flex-1 relative'>
                                <FilterMenu
                                    options={timeRanges}
                                    filter={timeRange}
                                    setFilter={setTimeRange}
                                    forLogs={true}
                                    showSelected={true}
                                    disabled={electionId !== election.id}
                                />
                            </div>
                            <p className='flex items-center gap-1 justify-end sm:hidden'>
                                <span className={statusConfig[status]?.color}>
                                    ●
                                </span>
                                <span className='font-semibold text-sm'>
                                    {statusConfig[status]?.label}
                                </span>
                            </p>
                        </div>
                        <p className='flex items-center gap-1 justify-end max-sm:hidden'>
                            <span className={statusConfig[status]?.color}>
                                ●
                            </span>
                            <span className='font-semibold text-sm'>
                                {statusConfig[status]?.label}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuditLogsHeader
