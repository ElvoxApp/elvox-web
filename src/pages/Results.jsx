import { useEffect, useMemo, useState } from "react"
import ResultsHeader from "../components/ResultsHeader"
import { useOutletContext } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../api/api"
import ResultsList from "../components/ResultsList"

const Results = () => {
    const [electionId, setElectionId] = useState("")
    const [elections, setElections] = useState([])
    const [className, setClassName] = useState("all")
    const [year, setYear] = useState("all")
    const [status, setStatus] = useState("all")
    const [results, setResults] = useState([])

    const { isLoading, setIsLoading } = useOutletContext()

    const visibleResults = useMemo(() => {
        const election = results.find((e) => e.electionId === electionId)

        if (!election) return []

        let list = [...election.results]

        // filter by year
        if (year !== "all") {
            const map = {
                first: [1, 2],
                second: [3, 4],
                third: [5, 6],
                fourth: [7, 8]
            }

            const sem = map[year]

            list = list.filter((l) => sem.includes(l.semester))
        }

        // filter by class
        if (className !== "all") {
            list = list.filter((l) => l.class.toLowerCase() === className)
        }

        // filter by status
        if (status !== "all") {
            list = list
                .map((l) => ({
                    ...l,
                    candidates: l.candidates.filter(
                        (c) => c.status.toLowerCase() === status
                    )
                }))
                .filter((l) => l.candidates.length > 0)
        }

        return list
    }, [className, electionId, year, status, results])

    const electionHasAnyResults = useMemo(() => {
        const election = results.find((e) => e.electionId === electionId)
        return (election?.results?.length ?? 0) > 0
    }, [electionId, results])

    useEffect(() => {
        const fetchElections = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/elections/all")
                const electionsData = res.data

                setElections(electionsData)

                const firstElectionWithResults = electionsData.find(
                    (el) => el.results?.length > 0
                )

                setElectionId(
                    firstElectionWithResults?.id ?? electionsData[0]?.id
                )
            } catch (err) {
                if (err.response)
                    toast.error(err.response?.data?.error, {
                        id: "elections-fetch-error"
                    })
            } finally {
                setIsLoading(false)
            }
        }

        const fetchResults = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/results")
                setResults(res.data)
            } catch (err) {
                if (err.response)
                    toast.error(err.response?.data?.error, {
                        id: "results-fetch-error"
                    })
            } finally {
                setIsLoading(false)
            }
        }

        fetchElections()
        fetchResults()
    }, [setIsLoading])

    if (isLoading) return null

    return (
        <div className='flex flex-col justify-center min-h-0 items-center px-2 md:px-5 lg:px-9 py-2 flex-1'>
            <title>Results</title>
            {electionId && (
                <div className='flex flex-col w-full flex-1 gap-4 max-w-5xl min-h-0 text-sm'>
                    <ResultsHeader
                        className={className}
                        setClassName={setClassName}
                        year={year}
                        setYear={setYear}
                        status={status}
                        setStatus={setStatus}
                        elections={elections.map((el) => {
                            return { value: el.id, label: el.name }
                        })}
                        electionId={electionId}
                        setElectionId={setElectionId}
                    />
                    {visibleResults.length > 0 && (
                        <ResultsList results={visibleResults} />
                    )}
                </div>
            )}

            {visibleResults.length === 0 && (
                <div
                    className={`flex px-3 py-4 gap-8 flex-1 justify-center ${
                        !electionId ? "items-center" : ""
                    }`}
                >
                    <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black'>
                        {!electionId && "Result not published yet"}

                        {electionId &&
                            !electionHasAnyResults &&
                            "No results published for this election"}

                        {electionId &&
                            electionHasAnyResults &&
                            "No results match the selected filters"}
                    </h2>
                </div>
            )}
        </div>
    )
}

export default Results
