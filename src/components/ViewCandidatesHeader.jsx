import { IoSearch } from "react-icons/io5"
import SortCandidates from "./SortCandidates"
import FilterCandidatesByYear from "./FilterCandidatesByYear"
import FilterCandidatesByClass from "./FilterCandidatesByClass"

const ViewCandidatesHeader = ({
    nameInput,
    setNameInput,
    sort,
    setSort,
    className, // not jsx className, but name of the class
    setClassName,
    year,
    setYear
}) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex gap-3'>
                <div className='w-full flex-3 relative sm:flex-4 md:flex-5 lg:flex-7'>
                    <span className='flex justify-center items-center text-secondary-light dark:text-secondary-dark p-2 inset-y-0 absolute'>
                        <IoSearch />
                    </span>
                    <input
                        type='text'
                        id='candidate-name'
                        className='outline-none border-none bg-field-light dark:bg-field-dark rounded-md w-full h-11 pl-8 p-3 text-primary-light dark:text-primary-dark placeholder:text-secondary-light dark:placeholder:text-secondary-dark active:bg-field-light dark:active:bg-field-dark appearance-none'
                        placeholder='Enter candidate name'
                        onChange={(e) => setNameInput(e.target.value)}
                        value={nameInput}
                    />
                </div>
                <div className='flex flex-col w-full flex-1 relative'>
                    <SortCandidates
                        sort={sort}
                        setSort={setSort}
                    />
                </div>
            </div>
            <div className='flex gap-3'>
                <div className='flex flex-col w-full flex-1 relative'>
                    <FilterCandidatesByYear
                        year={year}
                        setYear={setYear}
                    />
                </div>
                <div className='flex flex-col w-full flex-1 relative'>
                    <FilterCandidatesByClass
                        className={className}
                        setClassName={setClassName}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewCandidatesHeader
