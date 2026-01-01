import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { useEffect, useRef } from "react"
import { HiCheck, HiChevronDown } from "react-icons/hi"

const FilterMenu = ({
    options = [],
    filter,
    setFilter,
    label,
    className,
    onOpenChange,
    showSelected = true
}) => {
    const listRef = useRef(null)

    useEffect(() => {
        const el = listRef.current
        if (!el || !onOpenChange) return

        const update = () => {
            onOpenChange(el.hasAttribute("data-open"))
        }

        update() // initial

        const observer = new MutationObserver(update)
        observer.observe(el, {
            attributes: true,
            attributeFilter: ["data-open"]
        })

        return () => observer.disconnect()
    }, [onOpenChange])

    return (
        <div
            className={`flex flex-col relative transition-all duration-200 ease-out flex-1 w-full ${className}`}
        >
            <Listbox
                value={filter}
                onChange={setFilter}
                ref={listRef}
                as='div'
            >
                <ListboxButton
                    className={`flex items-center justify-between gap-2 cursor-pointer w-full bg-field-light dark:bg-field-dark rounded-md p-2 flex-1 focus:outline-none text-primary-light dark:text-primary-dark`}
                >
                    <span className='text-sm'>
                        {`${
                            label ? (showSelected ? `${label}: ` : label) : ""
                        } ${
                            showSelected
                                ? options.find(
                                      (option) => option.value === filter
                                  )?.label ?? ""
                                : ""
                        }`}
                    </span>
                    <HiChevronDown className='size-5' />
                </ListboxButton>
                <ListboxOptions className='flex flex-col border border-gray-500 rounded-xl focus:outline-none text-sm absolute w-full top-10 left-0 z-10 bg-bg-light dark:bg-bg-dark'>
                    {options.map((option) => (
                        <ListboxOption
                            key={option?.value}
                            value={option?.value}
                            className='group flex justify-between items-center gap-2 px-3 py-2 cursor-pointer rounded-sm text-primary-light dark:text-primary-dark hover:text-primary-dark hover:bg-accent truncate'
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
