import { useEffect, useState } from "react"
import api from "../api/api"
import FilterMenu from "./FilterMenu"

const FilterCandidatesByClass = ({
    className,
    setClassName,
    onOpenChange,
    showSelected = true
}) => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await api.get("/classes")
            const data = await res.data

            const clses = [
                ...new Map(
                    data.map((cls) => [
                        cls.name.toLowerCase(),
                        {
                            id: cls.id,
                            value: cls.name.toLowerCase(),
                            label: cls.name
                        }
                    ])
                ).values()
            ]

            setClasses(clses)
        }

        fetchClasses()
    }, [])

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
