import { Dialog, DialogPanel } from "@headlessui/react"
import { IoMdClose } from "react-icons/io"
import FilterMenu from "./FilterMenu"
import FilterCandidatesByClass from "./FilterCandidatesByClass"

const ResultsFiltersMobile = ({
    showMobileFilters,
    setShowMobileFilters,
    elections,
    electionId,
    setElectionId,
    year,
    setYear,
    className,
    setClassName,
    status,
    setStatus
}) => {
    return (
        <Dialog
            open={showMobileFilters}
            onClose={setShowMobileFilters}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs sm:hidden'
        >
            <DialogPanel className='fixed inset-y-0 left-0 w-72 bg-card-light dark:bg-card-dark dark:text-primary-dark text-primary-light shadow-xl p-6 flex flex-col'>
                <div className='shrink-0 relative'>
                    <div className='border-b border-gray-500 w-full p-2'>
                        <h2 className='text-lg text-center'>Filters</h2>
                    </div>
                    <IoMdClose
                        className='absolute -right-1.5 -top-2.5 text-2xl cursor-pointer active:scale-50 transition-all duration-300'
                        onClick={() => setShowMobileFilters(false)}
                    />
                </div>
                <div className='flex flex-col gap-4 py-8'>
                    <FilterMenu
                        options={elections}
                        filter={electionId}
                        setFilter={setElectionId}
                        label='Election'
                        showSelected={false}
                    />
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
                    />
                    <FilterCandidatesByClass
                        className={className}
                        setClassName={setClassName}
                        showSelected={false}
                    />
                    <FilterMenu
                        options={[
                            { value: "all", label: "All" },
                            { value: "won", label: "Won" },
                            { value: "lost", label: "Lost" },
                            { value: "tie", label: "Tie" }
                        ]}
                        filter={status}
                        setFilter={setStatus}
                        label='Status'
                        showSelected={false}
                    />
                </div>
            </DialogPanel>
        </Dialog>
    )
}

export default ResultsFiltersMobile
