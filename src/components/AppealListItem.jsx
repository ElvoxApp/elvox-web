import { Link } from "react-router-dom"
import { useAuthStore, useElectionStore } from "../stores"
import capitalize from "../utils/capitalize"

const statusStyles = {
    pending:
        "bg-yellow-400/40 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 ring-1 ring-yellow-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium",
    approved:
        "bg-green-400/30 dark:bg-green-400/20 text-green-500 dark:text-green-400 ring-1 ring-green-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium",
    rejected:
        "bg-red-400/40 dark:bg-red-400/20 text-red-600 dark:text-red-400 ring-1 ring-red-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium"
}

const formatDate = (value) =>
    new Date(value)
        .toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        })
        .replace(/\b(am|pm)\b/, (m) => m.toUpperCase())

const getCategory = (category) => {
    const APPEAL_CATEGORIES = {
        candidate_application: "Candidate Application",
        election_result: "Election Result",
        voting_issue: "Voting Issue",
        account_access: "Account / Access",
        other: "Other"
    }

    return APPEAL_CATEGORIES[category]
}

const AppealListItem = ({ appeal }) => {
    const {
        user: { role }
    } = useAuthStore()
    const { election } = useElectionStore()

    return (
        <Link
            to={appeal.id}
            className='flex flex-col gap-2 bg-card-light dark:bg-card-dark w-full px-3 py-2 rounded-md text-sm hover:bg-[#d4d4d4] dark:hover:bg-[#16171d]'
        >
            <div className='flex justify-between'>
                <p className='text-primary-light dark:text-primary-dark text-base'>
                    {appeal.subject}
                </p>
                <p className={`${statusStyles[appeal.status]}`}>
                    {capitalize(appeal.status)}
                </p>
            </div>
            <div className='flex flex-col gap-1 text-secondary-light dark:text-secondary-dark'>
                <p>
                    Election:{" "}
                    {appeal.election_id === election.id ? election.name : ""}
                </p>
                <p>Category: {getCategory(appeal.category)}</p>
                <p className='truncate'>Description: {appeal.description}</p>
                {role === "admin" && (
                    <p>
                        Submitted by: {appeal.user_name} (
                        {capitalize(appeal.user_role)})
                    </p>
                )}
                <p>
                    {appeal.status === "pending"
                        ? `Submitted on: ${formatDate(appeal.created_at)}`
                        : `Reviewed on: ${formatDate(appeal.updated_at)}`}
                </p>
            </div>
        </Link>
    )
}

export default AppealListItem
