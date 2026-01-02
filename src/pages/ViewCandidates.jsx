import { useEffect, useMemo, useState } from "react"
import ViewCandidatesHeader from "../components/ViewCandidatesHeader"
import Candidate from "../components/Candidate"
import { toast } from "react-hot-toast"
import { useOutletContext } from "react-router-dom"
import api from "../api/api"

const ViewCandidates = () => {
    const [candidates, setCandidates] = useState([])
    const [nameInput, setNameInput] = useState("")
    const [sort, setSort] = useState("name")
    const [year, setYear] = useState("all")
    const [className, setClassName] = useState("all")

    const { isLoading, setIsLoading } = useOutletContext()

    const visibleCandidates = useMemo(() => {
        let list = [...candidates]

        // search
        if (nameInput.trim() !== "") {
            const lower = nameInput.toLowerCase()
            list = list.filter((l) => l.name.toLowerCase().includes(lower))
        }

        // sort
        if (sort === "name") {
            list.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sort === "latest") {
            list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }

        // filter by class
        if (className !== "all") {
            list = list.filter((l) => l.class.toLowerCase() === className)
        }

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

        return list
    }, [candidates, className, year, sort, nameInput])

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/candidates?status=approved")
                if (res.status === 200) setCandidates(res.data)
            } catch (err) {
                toast.error(
                    err.response?.data?.error ||
                        "Could not fetch candidates. Please try again",
                    { id: "candidates-fetch-error" }
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchCandidates()
    }, [setIsLoading])

    const TEMP = [
        {
            actioned_by: null,
            category: "General",
            class: "Bsc. Computer Science",
            department: "Computer Science",
            election_id: "251b1e0c-e454-4874-9cd4-424f90a0ab4f",
            id: "9afb9a3-f1dc-4fb6-bbfe-90ec4ea5a7c4",
            name: "John Doe",
            profile_pic:
                "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg",
            semester: 5,
            status: "approved",
            updated_at: "2025-12-31T14:47:11.344Z"
        },
        {
            actioned_by: null,
            category: "General",
            class: "Bsc. Computer Science",
            department: "Computer Science",
            election_id: "251b1e0c-e454-4874-9cd4-424f90a0ab4f",
            id: "9afb9a3-f1dc-4fb6-bbde-90ec4ea5a7c4",
            name: "John Doe",
            profile_pic:
                "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg",
            semester: 5,
            status: "approved",
            updated_at: "2025-12-31T14:47:11.344Z"
        },
        {
            actioned_by: null,
            category: "General",
            class: "Bsc. Computer Science",
            department: "Computer Science",
            election_id: "251b1e0c-e454-3874-9cd4-424f90a0ab4f",
            id: "9afb9a3-f1dc-4fb6-bbfe-90ec4ea5a7c4",
            name: "John Doe",
            profile_pic:
                "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg",
            semester: 5,
            status: "approved",
            updated_at: "2025-12-31T14:47:11.344Z"
        },
        {
            actioned_by: null,
            category: "General",
            class: "Bsc. Computer Science",
            department: "Computer Science",
            election_id: "258b1e0c-e454-4874-9cd4-424f90a0ab4f",
            id: "9afb9a3-f1dc-4fb6-bbfe-90ec4ea5a7c4",
            name: "John Doe",
            profile_pic:
                "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg",
            semester: 5,
            status: "approved",
            updated_at: "2025-12-31T14:47:11.344Z"
        },
        {
            actioned_by: null,
            category: "General",
            class: "Bsc. Computer Science",
            department: "Computer Science",
            election_id: "751b1e0c-e454-4874-9cd4-424f90a0ab4f",
            id: "9afb9a3-f1dc-4fb6-bbfe-90ec4ea5a7c4",
            name: "John Doe",
            profile_pic:
                "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg",
            semester: 5,
            status: "approved",
            updated_at: "2025-12-31T14:47:11.344Z"
        },
        {
            actioned_by: null,
            category: "General",
            class: "Bsc. Computer Science",
            department: "Computer Science",
            election_id: "258b4e0c-e454-4874-9cd4-424f90a0ab4f",
            id: "9afb9a3-f1dc-4fb6-bbfe-90ec4ea5a7c4",
            name: "John Doe",
            profile_pic:
                "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg",
            semester: 5,
            status: "approved",
            updated_at: "2025-12-31T14:47:11.344Z"
        },
        {
            actioned_by: null,
            category: "General",
            class: "Bsc. Mathematics",
            department: "Computer Science",
            election_id: "751b1e0c-e454-4874-9cd4-424f90a0ab4f",
            id: "9afb9a3-f1dc-4fb6-bbfe-90cc4ea5a7c4",
            name: "John Doe",
            profile_pic:
                "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg",
            semester: 5,
            status: "approved",
            updated_at: "2025-12-31T14:47:11.344Z"
        }
    ]

    if (isLoading) return null

    return (
        <div className='flex flex-col items-center px-2 md:px-5 lg:px-9 py-5 flex-1 min-h-0'>
            <title>Candidates</title>
            {candidates?.length > 0 && (
                <div className='flex flex-col flex-1 w-full gap-8 max-w-5xl min-h-0'>
                    <ViewCandidatesHeader
                        nameInput={nameInput}
                        setNameInput={setNameInput}
                        sort={sort}
                        setSort={setSort}
                        year={year}
                        setYear={setYear}
                        className={className}
                        setClassName={setClassName}
                    />
                    {visibleCandidates.length > 0 && (
                        <div className='flex flex-col flex-1 gap-3 overflow-y-auto custom-scrollbar min-h-0 rounded-md bg-card-light dark:bg-card-dark px-2 py-4'>
                            {TEMP.map((candidate) => (
                                <Candidate
                                    candidate={candidate}
                                    key={candidate.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {!visibleCandidates.length && (
                <div className='flex px-3 py-4 gap-8 flex-1 items-center justify-center'>
                    <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black w-[20ch]'>
                        No Candidate Applications To Show
                    </h2>
                </div>
            )}
        </div>
    )
}

export default ViewCandidates
