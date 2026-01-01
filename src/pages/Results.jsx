import { useEffect, useState } from "react"
import ResultsHeader from "../components/ResultsHeader"
import { useElectionStore } from "../stores"
import { useOutletContext } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../api/api"

const DEMO_RESULTS = {
    electionId: "ELX-2025",
    results: [
        {
            class: "Bsc. Computer Science",
            semester: 2,
            candidates: [
                {
                    id: "cs2-1",
                    name: "Ayaan Rahman",
                    category: "GENERAL",
                    votes: 120,
                    lead: "+18",
                    status: "WIN"
                },
                {
                    id: "cs2-2",
                    name: "Rohit Kumar",
                    category: "GENERAL",
                    votes: 102,
                    lead: "-18",
                    status: "TIE"
                },
                {
                    id: "cs2-3",
                    name: "Sneha Das",
                    category: "RESERVED",
                    votes: 102,
                    lead: "-18",
                    status: "TIE"
                }
            ]
        },
        {
            class: "Bsc. Computer Science",
            semester: 4,
            candidates: [
                {
                    id: "cs4-1",
                    name: "Farhan Ali",
                    category: "GENERAL",
                    votes: 146,
                    lead: "+31",
                    status: "WIN"
                },
                {
                    id: "cs4-2",
                    name: "Nikhil Menon",
                    category: "GENERAL",
                    votes: 115,
                    lead: "-31",
                    status: "LOST"
                }
            ]
        },
        {
            class: "Bsc. Computer Science",
            semester: 6,
            candidates: [
                {
                    id: "cs6-1",
                    name: "Ananya Roy",
                    category: "RESERVED",
                    votes: 98,
                    lead: "+12",
                    status: "WIN"
                },
                {
                    id: "cs6-2",
                    name: "Karthik S",
                    category: "GENERAL",
                    votes: 86,
                    lead: "-12",
                    status: "LOST"
                }
            ]
        },
        {
            class: "Bsc. Computer Science",
            semester: 8,
            candidates: [
                {
                    id: "cs8-1",
                    name: "Meera Nair",
                    category: "GENERAL",
                    votes: 134,
                    lead: "+40",
                    status: "WIN"
                },
                {
                    id: "cs8-2",
                    name: "Abhishek Jain",
                    category: "GENERAL",
                    votes: 94,
                    lead: "-40",
                    status: "LOST"
                }
            ]
        },

        {
            class: "Bsc. Physics",
            semester: 2,
            candidates: [
                {
                    id: "ph2-1",
                    name: "Rahul Verma",
                    category: "GENERAL",
                    votes: 89,
                    lead: "+7",
                    status: "WIN"
                },
                {
                    id: "ph2-2",
                    name: "Pooja Singh",
                    category: "RESERVED",
                    votes: 82,
                    lead: "-7",
                    status: "LOST"
                }
            ]
        },
        {
            class: "Bsc. Physics",
            semester: 4,
            candidates: [
                {
                    id: "ph4-1",
                    name: "Aditya Malhotra",
                    category: "GENERAL",
                    votes: 110,
                    lead: "+22",
                    status: "WIN"
                },
                {
                    id: "ph4-2",
                    name: "Neha Kulkarni",
                    category: "GENERAL",
                    votes: 88,
                    lead: "-22",
                    status: "LOST"
                }
            ]
        },
        {
            class: "Bsc. Physics",
            semester: 6,
            candidates: [
                {
                    id: "ph6-1",
                    name: "Siddharth Rao",
                    category: "GENERAL",
                    votes: 95,
                    lead: "+15",
                    status: "WIN"
                },
                {
                    id: "ph6-2",
                    name: "Isha Patel",
                    category: "RESERVED",
                    votes: 80,
                    lead: "-15",
                    status: "LOST"
                }
            ]
        },
        {
            class: "Bsc. Physics",
            semester: 8,
            candidates: [
                {
                    id: "ph8-1",
                    name: "Varun Chatterjee",
                    category: "GENERAL",
                    votes: 101,
                    lead: "+9",
                    status: "WIN"
                },
                {
                    id: "ph8-2",
                    name: "Kavya Iyer",
                    category: "GENERAL",
                    votes: 92,
                    lead: "-9",
                    status: "LOST"
                }
            ]
        }
    ]
}

const Results = () => {
    const [elections, setElections] = useState([])
    const [className, setClassName] = useState("all")
    const [year, setYear] = useState("all")
    const [sort, setSort] = useState("all")

    const { election } = useElectionStore()

    const { isLoading, setIsLoading } = useOutletContext()

    const [electionId, setElectionId] = useState("")
    const visibleResults = []

    useEffect(() => {
        if (election?.id) {
            setElectionId(election.id)
        }
    }, [election])

    useEffect(() => {
        const fetchElections = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/elections/all")
                setElections(res.data)
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
    }, [setIsLoading])

    return (
        <div className='flex justify-center px-2 md:px-5 lg:px-9 py-5 flex-1'>
            <title>Results</title>
            <div className='flex flex-col flex-1 gap-8 max-w-5xl py-5'>
                <ResultsHeader
                    className={className}
                    setClassName={setClassName}
                    year={year}
                    setYear={setYear}
                    sort={sort}
                    setSort={setSort}
                    elections={elections.map((el) => {
                        return { value: el.id, label: el.name }
                    })}
                    electionId={electionId}
                    setElectionId={setElectionId}
                />
            </div>
            {/* {!visibleResults.length && (
                <div className='flex px-3 py-4 gap-8 flex-1 items-center justify-center'>
                    <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black w-[20ch]'>
                        No Results To Show
                    </h2>
                </div>
            )} */}
        </div>
    )
}

export default Results
