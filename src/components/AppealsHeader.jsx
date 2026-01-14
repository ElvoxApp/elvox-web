import { useState } from "react"
import { useAuthStore } from "../stores"
import Button from "./Button"
import FilterMenu from "./FilterMenu"
import SortByTime from "./SortByTime"
import { useMediaQuery } from "react-responsive"

const AppealsHeader = ({
    setShowAppealForm,
    sort,
    setSort,
    category,
    setCategory,
    elections,
    electionId,
    setElectionId
}) => {
    const [electionOpen, setElectionOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    const {
        user: { role }
    } = useAuthStore()

    const isMedium = useMediaQuery({ minWidth: 793 })

    return (
        <div className='flex items-center justify-between flex-1'>
            {role !== "admin" && (
                <>
                    <h2 className='text-sm sm:text-lg lg:text-xl font-semibold text-primary-light dark:text-primary-dark'>
                        My Appeals
                    </h2>
                    <Button
                        text='Submit Appeal'
                        className='px-2 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm font-medium bg-accent hover:bg-button-hover'
                        onClick={() => setShowAppealForm(true)}
                    />
                </>
            )}
            {role === "admin" && (
                <div className='flex gap-3 w-full transition-all duration-200 ease-out'>
                    <div
                        className={`flex relative transition-all duration-200 ease-out flex-1 ${
                            electionOpen ? "max-sm:flex-2" : "max-sm:flex-[0.6]"
                        }`}
                    >
                        <FilterMenu
                            options={elections}
                            filter={electionId}
                            setFilter={setElectionId}
                            label={isMedium ? "" : "Election"}
                            showSelected={isMedium}
                            onOpenChange={setElectionOpen}
                        />
                    </div>
                    <div
                        className={`flex relative transition-all duration-200 ease-out flex-1 ${
                            categoryOpen ? "max-sm:flex-2" : "max-sm:flex-[0.6]"
                        }`}
                    >
                        <FilterMenu
                            filter={category}
                            setFilter={setCategory}
                            label={
                                category === "all" || !isMedium
                                    ? "Category"
                                    : ""
                            }
                            options={[
                                { value: "all", label: "All" },
                                {
                                    value: "candidate_application",
                                    label: "Candidate Application"
                                },
                                {
                                    value: "election_result",
                                    label: "Election Result"
                                },
                                {
                                    value: "voting_issue",
                                    label: "Voting Issue"
                                },
                                {
                                    value: "account_access",
                                    label: "Account / Access"
                                },
                                { value: "other", label: "Other" }
                            ]}
                            showSelected={isMedium}
                            onOpenChange={setCategoryOpen}
                        />
                    </div>
                    <div
                        className={`flex relative transition-all duration-200 ease-out ${
                            isMedium ? "flex-1" : "flex-[0.8]"
                        } ${sortOpen ? "max-sm:flex-2" : "max-sm:flex-[0.6]"}`}
                    >
                        <SortByTime
                            sort={sort}
                            setSort={setSort}
                            onOpenChange={setSortOpen}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppealsHeader
