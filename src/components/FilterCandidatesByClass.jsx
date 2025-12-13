import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { useEffect, useState } from "react"
import { HiCheck, HiChevronDown } from "react-icons/hi"
import api from "../api/api"

const FilterCandidatesByClass = ({ className, setClassName }) => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await api.get("/classes")
            const data = await res.data

            const clses = data.map((cls) => {
                return {
                    id: cls.id,
                    value: cls.name.toLowerCase(),
                    name: cls.name
                }
            })

            setClasses([{ id: 0, value: "all", name: "All" }, ...clses])
        }

        fetchClasses()
    }, [])

    return (
        <Listbox
            value={className}
            onChange={setClassName}
        >
            <ListboxButton className='flex items-center justify-between gap-2 cursor-pointer w-full bg-field-light dark:bg-field-dark rounded-xl p-2 flex-1 focus:outline-none text-primary-light dark:text-primary-dark'>
                <span className='text-sm'>Class</span>
                <HiChevronDown className='size-5' />
            </ListboxButton>
            <ListboxOptions className='flex flex-col border border-gray-500 rounded-xl focus:outline-none text-sm absolute w-full top-10 z-10 bg-bg-light dark:bg-bg-dark'>
                {classes &&
                    classes.map((cls) => (
                        <ListboxOption
                            value={cls.value}
                            className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                            key={cls.id}
                        >
                            <span>{cls.name}</span>
                            <HiCheck className='invisible size-4 group-data-selected:visible' />
                        </ListboxOption>
                    ))}
            </ListboxOptions>
        </Listbox>
    )
}

export default FilterCandidatesByClass
