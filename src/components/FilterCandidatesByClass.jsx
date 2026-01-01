import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react"
import { useEffect, useState } from "react"
import { HiCheck, HiChevronDown } from "react-icons/hi"
import api from "../api/api"
import FilterMenu from "./FilterMenu"

const FilterCandidatesByClass = ({
    className,
    setClassName,
    onOpenChange,
    showSelected = true,
    idAsValue = false
}) => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await api.get("/classes")
            const data = await res.data

            const clses = data.map((cls) => {
                return {
                    id: cls.id,
                    value: idAsValue ? cls.id : cls.name.toLowerCase(),
                    label: cls.name
                }
            })

            setClasses(clses)
        }

        fetchClasses()
    }, [idAsValue])

    return (
        <FilterMenu
            options={[{ id: 0, value: "all", label: "All" }, ...classes]}
            filter={className}
            setFilter={setClassName}
            label='Class'
            showSelected={showSelected}
            onOpenChange={onOpenChange}
        />
    )
}

export default FilterCandidatesByClass
