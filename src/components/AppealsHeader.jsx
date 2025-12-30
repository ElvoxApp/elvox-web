import { useAuthStore } from "../stores"
import Button from "./Button"
import FilterMenu from "./FilterMenu"
import SortByTime from "./SortByTime"

const AppealsHeader = ({
    setShowAppealForm,
    sort,
    setSort,
    filter,
    setFilter
}) => {
    const {
        user: { role }
    } = useAuthStore()

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
                <div className='flex h-10 gap-3 w-full'>
                    <FilterMenu
                        filter={filter}
                        setFilter={setFilter}
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
                            { value: "voting_issue", label: "Voting Issue" },
                            {
                                value: "account_access",
                                label: "Account / Access"
                            },
                            { value: "other", label: "Other" }
                        ]}
                    />
                    <SortByTime
                        sort={sort}
                        setSort={setSort}
                    />
                </div>
            )}
        </div>
    )
}

export default AppealsHeader
