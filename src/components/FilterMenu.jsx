import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { HiCheck, HiChevronDown } from "react-icons/hi"

const FilterMenu = ({ options = [], filter, setFilter, label }) => {
    return (
        <div className='flex flex-col w-full flex-1 relative'>
            <Listbox
                value={filter}
                onChange={setFilter}
            >
                <ListboxButton className='flex items-center justify-between gap-2 cursor-pointer w-full bg-field-light dark:bg-field-dark rounded-xl p-2 flex-1 focus:outline-none text-primary-light dark:text-primary-dark'>
                    <span className='text-sm'>
                        {`${label ? label + ": " : ""} ${
                            options.find((option) => option.value === filter)
                                ?.label
                        }`}
                    </span>
                    <HiChevronDown className='size-5' />
                </ListboxButton>
                <ListboxOptions className='flex flex-col border border-gray-500 rounded-xl focus:outline-none text-sm absolute w-full top-10 z-10 bg-bg-light dark:bg-bg-dark'>
                    {options.map((option) => (
                        <ListboxOption
                            key={option?.value}
                            value={option?.value}
                            className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                        >
                            <span>{option?.label}</span>
                            <HiCheck className='invisible size-4 group-data-selected:visible' />
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    )
}

export default FilterMenu
