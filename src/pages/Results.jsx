import { useEffect, useState } from "react"
import ResultsHeader from "../components/ResultsHeader"
import toast from "react-hot-toast"
import api from "../api/api"
import ResultsList from "../components/ResultsList"
import FullScreenLoader from "../components/FullScreenLoader"

const Results = () => {
    const [electionId, setElectionId] = useState("")
    const [elections, setElections] = useState([])
    const [classValue, setClassValue] = useState("all")
    const [year, setYear] = useState("all")
    const [status, setStatus] = useState("all")
    const [results, setResults] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const electionHasAnyResults = results.length > 0

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

        fetchElections()
    }, [])

    useEffect(() => {
        if (!electionId) return

        const fetchResults = async () => {
            try {
                setIsLoading(true)
                const res = await api.get(`/results/${electionId}`, {
                    params: {
                        status,
                        class: classValue,
                        year
                    }
                })
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

        fetchResults()
    }, [status, year, classValue, electionId])

    return (
        <div className='flex flex-col justify-center min-h-0 items-center px-2 md:px-5 lg:px-9 py-2 flex-1'>
            <title>Results</title>
            {electionId && (
                <div className='flex flex-col w-full flex-1 gap-4 max-w-5xl min-h-0 text-sm'>
                    <ResultsHeader
                        classValue={classValue}
                        setClassValue={setClassValue}
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
                    {results.length > 0 && <ResultsList results={results} />}
                </div>
            )}

            {results.length === 0 && !isLoading && (
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
            {isLoading && (
                <div className='flex justify-between items-center'>
                    <FullScreenLoader />
                </div>
            )}
        </div>
    )
}

export default Results
