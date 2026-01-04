import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { HiCheck, HiChevronDown } from "react-icons/hi"
import { useAuthStore } from "../stores"
import { Controller, useFormContext } from "react-hook-form"

const SelectCategory = () => {
    const { control } = useFormContext()
    const { user } = useAuthStore()

    return (
        <Controller
            name='category'
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
                <Listbox
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                >
                    <ListboxButton
                        id='category'
                        className='flex items-center justify-between gap-2 cursor-pointer w-full bg-field-light dark:bg-field-dark rounded-md p-2'
                    >
                        <span>{field.value || "Select Category"}</span>
                        <HiChevronDown className='size-5' />
                    </ListboxButton>
                    <ListboxOptions className='flex flex-col border border-gray-500 rounded-md w-full'>
                        <ListboxOption
                            value='general'
                            className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent'
                        >
                            <span>General</span>
                            <HiCheck className='invisible size-4 group-data-selected:visible' />
                        </ListboxOption>
                        {user?.gender === "female" && (
                            <ListboxOption
                                value='reserved'
                                className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm hover:bg-accent'
                            >
                                <span>Reserved</span>
                                <HiCheck className='invisible size-4 group-data-selected:visible' />
                            </ListboxOption>
                        )}
                    </ListboxOptions>
                </Listbox>
            )}
        />
    )
}

export default SelectCategory
