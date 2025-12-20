import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { HiCheck, HiChevronDown } from "react-icons/hi"

const SelectPosition = ({ user, position, setPosition }) => {
    return (
        <Listbox
            value={position}
            onChange={setPosition}
        >
            <ListboxButton className='flex items-center justify-between gap-2 cursor-pointer w-full bg-field-light dark:bg-field-dark rounded-md p-2'>
                <span>{position}</span>
                <HiChevronDown className='size-5' />
            </ListboxButton>
            <ListboxOptions className='flex flex-col border border-gray-500 rounded-md w-full'>
                <ListboxOption
                    value='General'
                    className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                >
                    <span>General</span>
                    <HiCheck className='invisible size-4 group-data-selected:visible' />
                </ListboxOption>
                {user?.gender === "female" && (
                    <ListboxOption
                        value='Reserved'
                        className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm hover:bg-accent'
                    >
                        <span>Reserved</span>
                        <HiCheck className='invisible size-4 group-data-selected:visible' />
                    </ListboxOption>
                )}
            </ListboxOptions>
        </Listbox>
    )
}

export default SelectPosition
