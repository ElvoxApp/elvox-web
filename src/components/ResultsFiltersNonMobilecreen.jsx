import FilterCandidatesByClass from "./FilterCandidatesByClass"
import FilterMenu from "./FilterMenu"

const ResultsFiltersNonMobilecreen = ({
    electionOpen,
    yearOpen,
    classOpen,
    sortOpen,
    elections,
    electionId,
    setElectionId,
    setElectionOpen,
    year,
    setYear,
    setYearOpen,
    className,
    setClassName,
    setClassOpen,
    sort,
    setSort,
    setSortOpen
}) => {
    return (
        <div
            className={`flex items-center gap-3 transition-all duration-200 ease-out ${
                electionOpen || yearOpen || classOpen || sortOpen
                    ? "w-lg"
                    : "w-md"
            }`}
        >
            <div
                className={`flex relative transition-all duration-200 ease-out ${
                    electionOpen ? "flex-2" : "flex-[0.6]"
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
                    yearOpen ? "flex-1" : "flex-[0.6]"
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
                    classOpen ? "flex-2" : "flex-[0.6]"
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
                    sortOpen ? "flex-1" : "flex-[0.6]"
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
    )
}

export default ResultsFiltersNonMobilecreen
