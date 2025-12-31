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
                    label: cls.name
                }
            })

            setClasses([{ id: 0, value: "all", label: "All" }, ...clses])
        }

        fetchClasses()
    }, [])

    return (
        <FilterMenu
            options={classes}
            filter={className}
            setFilter={setClassName}
        />
    )
}

export default FilterCandidatesByClass
