import FilterCandidatesByClass from "./FilterCandidatesByClass"
import FilterMenu from "./FilterMenu"
import Button from "./Button"
import { useState } from "react"

const ResultsHeader = ({
    electionId,
    setElectionId,
    elections,
    className, // not jsx className, but name of the class
    setClassName,
    year,
    setYear,
    sort,
    setSort
}) => {
    const [electionOpen, setElectionOpen] = useState(false)
    const [yearOpen, setYearOpen] = useState(false)
    const [classOpen, setClassOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-6 rounded-xl px-4 py-3'>
                <div
                    className={`grid grid-cols-2 sm:grid-cols-4 items-center gap-3 transition-all duration-200 ease-out ${
                        electionOpen || yearOpen || classOpen || sortOpen
                            ? "sm:w-lg w-full"
                            : "sm:w-md w-full"
                    }`}
                >
                    <div
                        className={`flex relative transition-all duration-200 ease-out ${
                            electionOpen
                                ? "sm:flex-2 flex-2"
                                : "flex-1 sm:flex-[0.6]"
                        }`}
                    >
                        <FilterMenu
                            options={elections}
                            filter={electionId}
                            setFilter={setElectionId}
                            label='Election'
                            showSelected={false}
                            onOpenChange={setElectionOpen}
                        />
                    </div>
                    <div
                        className={`flex relative transition-all duration-200 ease-out ${
                            yearOpen ? "sm:flex-1" : "flex-1 sm:flex-[0.6]"
                        }`}
                    >
                        <FilterMenu
                            options={[
                                { value: "all", label: "All" },
                                { value: "first", label: "First Year" },
                                { value: "second", label: "Second Year" },
                                { value: "third", label: "Third Year" },
                                { value: "fourth", label: "Fourth Year" }
                            ]}
                            filter={year}
                            setFilter={setYear}
                            label='Year'
                            showSelected={false}
                            onOpenChange={setYearOpen}
                        />
                    </div>
                    <div
                        className={`flex relative transition-all duration-200 ease-out ${
                            classOpen ? "sm:flex-2" : "flex-1 sm:flex-[0.6]"
                        }`}
                    >
                        <FilterCandidatesByClass
                            className={className}
                            setClassName={setClassName}
                            showSelected={false}
                            onOpenChange={setClassOpen}
                        />
                    </div>
                    <div
                        className={`flex relative transition-all duration-200 ease-out ${
                            sortOpen ? "sm:flex-1" : "flex-1 sm:flex-[0.6]"
                        }`}
                    >
                        <FilterMenu
                            options={[
                                { value: "all", label: "All" },
                                { value: "won", label: "Won" },
                                { value: "lost", label: "Lost" },
                                { value: "tie", label: "Tie" }
                            ]}
                            filter={sort}
                            setFilter={setSort}
                            label='Sort'
                            showSelected={false}
                            onOpenChange={setSortOpen}
                        />
                    </div>
                </div>

                <Button
                    text='Export'
                    className='h-9 px-4 text-sm bg-transparent border border-accent hover:bg-accent'
                    type='button'
                    onClick={() => {}}
                />
            </div>
        </div>
    )
}

export default ResultsHeader
