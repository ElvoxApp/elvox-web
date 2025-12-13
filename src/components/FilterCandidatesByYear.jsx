import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { HiCheck, HiChevronDown } from "react-icons/hi"

const FilterCandidatesByYear = ({ year, setYear }) => {
    return (
        <Listbox
            value={year}
            onChange={setYear}
        >
            <ListboxButton className='flex items-center justify-between gap-2 cursor-pointer w-full bg-field-light dark:bg-field-dark rounded-xl p-2 flex-1 focus:outline-none text-primary-light dark:text-primary-dark'>
                <span className='text-sm'>Year</span>
                <HiChevronDown className='size-5' />
            </ListboxButton>
            <ListboxOptions className='flex flex-col border border-gray-500 rounded-xl focus:outline-none text-sm absolute w-full top-10 z-10 bg-bg-light dark:bg-bg-dark'>
                <ListboxOption
                    value='all'
                    className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                >
                    <span>All</span>
                    <HiCheck className='invisible size-4 group-data-selected:visible' />
                </ListboxOption>
                <ListboxOption
                    value='first'
                    className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                >
                    <span>First Year</span>
                    <HiCheck className='invisible size-4 group-data-selected:visible' />
                </ListboxOption>
                <ListboxOption
                    value='second'
                    className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                >
                    <span>Second Year</span>
                    <HiCheck className='invisible size-4 group-data-selected:visible' />
                </ListboxOption>
                <ListboxOption
                    value='third'
                    className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                >
                    <span>Third Year</span>
                    <HiCheck className='invisible size-4 group-data-selected:visible' />
                </ListboxOption>
                <ListboxOption
                    value='fourth'
                    className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                >
                    <span>Fourth Year</span>
                    <HiCheck className='invisible size-4 group-data-selected:visible' />
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    )
}

export default FilterCandidatesByYear
