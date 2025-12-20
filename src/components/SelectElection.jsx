import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { HiCheck, HiChevronDown } from "react-icons/hi"
import { useElectionStore } from "../stores"

const SelectElection = ({ election, setElection }) => {
    const elections = useElectionStore((state) => state.election)

    const electionOptions = elections.map((el) => ({
        name: el.name,
        id: el.id
    }))

    console.log(elections)

    return (
        <Listbox
            value={election}
            onChange={setElection}
        >
            <ListboxButton className='flex items-center justify-between gap-2 cursor-pointer w-full bg-field-light dark:bg-field-dark rounded-md p-2'>
                <span>
                    {electionOptions.find((e) => e.id === election)?.name ??
                        "Select Election"}
                </span>
                <HiChevronDown className='size-5' />
            </ListboxButton>
            <ListboxOptions className='flex flex-col border border-gray-500 rounded-md w-full'>
                {electionOptions.map((el) => (
                    <ListboxOption
                        key={el.id}
                        value={el.id}
                        className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                    >
                        <span>{el.name}</span>
                        <HiCheck className='invisible size-4 group-data-selected:visible' />
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}

export default SelectElection
