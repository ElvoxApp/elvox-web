import { useEffect, useState } from "react"
import AuditLogsHeader from "../components/AuditLogsHeader"
import toast from "react-hot-toast"
import api from "../api/api"
import { useElectionStore } from "../stores"
import FullScreenLoader from "../components/FullScreenLoader"

const formatDate = (value) => {
    if (!value) return "—"
    return new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    })
}

const DEMO = [
    {
        id: 1,
        timestamp: "2026-01-11T10:00:02Z",
        level: "INFO",
        message: "Election 'Student Council 2026' started"
    },
    {
        id: 2,
        timestamp: "2026-01-11T10:03:18Z",
        level: "INFO",
        message: "Supervisor verified voter (student_id masked)"
    },
    {
        id: 3,
        timestamp: "2026-01-11T10:05:41Z",
        level: "ERROR",
        message:
            "Vote recording failed due to database timeout while attempting to persist ballot data to the primary database"
    },
    {
        id: 4,
        timestamp: "2026-01-11T10:06:12Z",
        level: "INFO",
        message: "Vote recorded successfully"
    },
    {
        id: 5,
        timestamp: "2026-01-11T10:12:47Z",
        level: "INFO",
        message: "Supervisor verified voter (student_id masked)"
    },
    {
        id: 6,
        timestamp: "2026-01-11T10:15:09Z",
        level: "INFO",
        message: "Supervisor verified voter (student_id masked)"
    },
    {
        id: 7,
        timestamp: "2026-01-11T10:21:33Z",
        level: "ERROR",
        message:
            "Failed to record vote after multiple retry attempts due to temporary loss of database connectivity"
    },
    {
        id: 8,
        timestamp: "2026-01-11T10:22:01Z",
        level: "INFO",
        message: "Database connection re-established and vote recording resumed"
    },
    {
        id: 9,
        timestamp: "2026-01-11T10:30:44Z",
        level: "INFO",
        message: "Supervisor verified voter (student_id masked)"
    },
    {
        id: 10,
        timestamp: "2026-01-11T10:45:12Z",
        level: "INFO",
        message: "Supervisor verified voter (student_id masked)"
    },
    {
        id: 11,
        timestamp: "2026-01-11T11:00:00Z",
        level: "INFO",
        message:
            "Mid-election checkpoint reached; voting process operating within expected parameters"
    },
    {
        id: 12,
        timestamp: "2026-01-11T11:18:29Z",
        level: "ERROR",
        message:
            "Cron job failed to advance election state due to lock timeout while waiting for ongoing vote transaction to complete"
    },
    {
        id: 13,
        timestamp: "2026-01-11T11:18:45Z",
        level: "INFO",
        message:
            "Cron job retry succeeded and election state was advanced successfully"
    },
    {
        id: 14,
        timestamp: "2026-01-11T11:35:10Z",
        level: "INFO",
        message: "Supervisor verified voter (student_id masked)"
    },
    {
        id: 15,
        timestamp: "2026-01-11T11:59:58Z",
        level: "INFO",
        message: "Final minutes before scheduled election close"
    },
    {
        id: 16,
        timestamp: "2026-01-11T12:00:00Z",
        level: "INFO",
        message: "Election 'Student Council 2026' closed"
    },
    {
        id: 17,
        timestamp: "2026-01-11T12:01:22Z",
        level: "INFO",
        message: "Vote counting process started"
    },
    {
        id: 18,
        timestamp: "2026-01-11T12:02:41Z",
        level: "ERROR",
        message:
            "Vote counting encountered an unexpected error while aggregating results; operation aborted and scheduled for retry"
    },
    {
        id: 19,
        timestamp: "2026-01-11T12:03:10Z",
        level: "INFO",
        message: "Vote counting retry initiated after previous failure"
    },
    {
        id: 20,
        timestamp: "2026-01-11T12:05:34Z",
        level: "INFO",
        message:
            "Vote counting completed successfully and results were persisted"
    },
    {
        id: 21,
        timestamp: "2026-01-11T12:06:00Z",
        level: "INFO",
        message: "Election results published"
    }
]

const AuditLogs = () => {
    const { election } = useElectionStore()

    const [electionId, setElectionId] = useState(election?.id)
    const [timeRange, setTimeRange] = useState("last_7_days")
    const [elections, setElections] = useState([])
    const [logs, setLogs] = useState([])
    const [electionsLoading, setElectionsLoading] = useState(false)
    const [logsLoading, setLogsLoading] = useState(false)

    const isLoading = electionsLoading || logsLoading

    useEffect(() => {
        const fetchElections = async () => {
            try {
                setElectionsLoading(true)
                const res = await api.get("/elections/all")
                const electionsData = res.data

                setElections(electionsData)
            } catch (err) {
                if (err.response)
                    toast.error(err.response?.data?.error, {
                        id: "elections-fetch-error"
                    })
            } finally {
                setElectionsLoading(false)
            }
        }

        fetchElections()
    }, [])

    useEffect(() => {
        if (!electionId) return

        const fetchLogs = async () => {
            try {
                setLogsLoading(true)
                const res = await api.get(`/logs/${electionId}`)
                setLogs(res.data)
            } catch (err) {
                if (err.response)
                    toast.error(err.response?.data?.error, {
                        id: "logs-fetch-error"
                    })
            } finally {
                setLogsLoading(false)
            }
        }

        fetchLogs()
    }, [electionId])

    return (
        <div className='flex flex-col px-2 flex-1 py-5'>
            <title>Manage Election</title>
            {elections.length > 0 && (
                <div className='flex flex-col md:px-3 lg:px-7 text-sm flex-1 gap-6 sm:py-3 text-primary-light dark:text-primary-dark'>
                    <AuditLogsHeader
                        elections={elections.map((el) => {
                            return { value: el.id, label: el.name }
                        })}
                        electionId={electionId}
                        setElectionId={setElectionId}
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                    />
                    <div className='flex flex-col flex-[1_1_0px] gap-1.5 border border-gray-500 py-3 px-2 overflow-y-auto custom-scrollbar font-mono tabular-nums'>
                        {DEMO.map((log) => (
                            <div
                                key={log.id}
                                className='flex flex-col max-sm:gap-1 sm:grid sm:grid-cols-[auto_5ch_1fr] gap-x-2'
                            >
                                <p className='text-secondary-light dark:text-secondary-dark pr-3'>
                                    [{formatDate(log.timestamp, true)}]
                                </p>
                                <div className='grid grid-cols-[5ch_1fr] gap-x-2 max-sm:pl-8 sm:contents'>
                                    <p
                                        className={
                                            log.level === "ERROR"
                                                ? "text-[#df0000] dark:text-red-500"
                                                : ""
                                        }
                                    >
                                        {log.level}
                                    </p>
                                    <p
                                        className={
                                            log.level === "ERROR"
                                                ? "text-[#df0000] dark:text-red-500"
                                                : ""
                                        }
                                    >
                                        {log.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isLoading && (
                <div className='flex justify-between items-center'>
                    <FullScreenLoader />
                </div>
            )}
        </div>
    )
}

export default AuditLogs
