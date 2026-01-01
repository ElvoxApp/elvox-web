import FilterCandidatesByClass from "./FilterCandidatesByClass"
import FilterMenu from "./FilterMenu"
import Button from "./Button"
import { useState } from "react"
import ResultsFiltersMobile from "./ResultsFiltersMobile"
import ResultsFiltersNonMobilecreen from "./ResultsFiltersNonMobilecreen"

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
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-6 rounded-xl px-4 py-3'>
                <div className='flex flex-col flex-1 sm:hidden'>
                    <div className='flex items-center justify-between flex-1'>
                        <Button
                            text='Filters'
                            className='h-9 px-4 text-sm bg-secondary-button hover:bg-secondary-button-hover-light dark:hover:bg-secondary-button-hover'
                            type='button'
                            onClick={() => setShowMobileFilters(true)}
                        />
                        <Button
                            text='Export'
                            className='h-9 px-4 text-sm bg-accent hover:bg-button-hover'
                            type='button'
                            onClick={() => {}}
                        />
                    </div>
                    {showMobileFilters && (
                        <ResultsFiltersMobile
                            showMobileFilters={showMobileFilters}
                            setShowMobileFilters={setShowMobileFilters}
                            electionOpen={electionOpen}
                            yearOpen={yearOpen}
                            classOpen={classOpen}
                            sortOpen={sortOpen}
                            elections={elections}
                            electionId={electionId}
                            setElectionId={setElectionId}
                            setElectionOpen={setElectionOpen}
                            year={year}
                            setYear={setYear}
                            setYearOpen={setYearOpen}
                            className={className}
                            setClassName={setClassName}
                            setClassOpen={setClassOpen}
                            sort={sort}
                            setSort={setSort}
                            setSortOpen={setSortOpen}
                        />
                    )}
                </div>

                <div className='flex items-center justify-between flex-1 gap-6 max-sm:hidden'>
                    <ResultsFiltersNonMobilecreen
                        electionOpen={electionOpen}
                        yearOpen={yearOpen}
                        classOpen={classOpen}
                        sortOpen={sortOpen}
                        elections={elections}
                        electionId={electionId}
                        setElectionId={setElectionId}
                        setElectionOpen={setElectionOpen}
                        year={year}
                        setYear={setYear}
                        setYearOpen={setYearOpen}
                        className={className}
                        setClassName={setClassName}
                        setClassOpen={setClassOpen}
                        sort={sort}
                        setSort={setSort}
                        setSortOpen={setSortOpen}
                    />
                    <Button
                        text='Export'
                        className='h-9 px-4 text-sm bg-accent hover:bg-button-hover'
                        type='button'
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ResultsHeader
