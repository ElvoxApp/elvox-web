import { useElectionStore } from "../stores"
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

const AppealDetailsSummary = ({ appeal }) => {
    const { election } = useElectionStore()

    const rows = [
        ["Appeal Subject", appeal.subject],
        ["Submitted By", appeal.user_name],
        [
            appeal.user_role === "student"
                ? "Admission Number"
                : "Employee Code",
            appeal.user_role === "student" ? appeal.admno : appeal.empcode
        ],
        ["Election", election.name],
        ["Appeal Category", getCategory(appeal.category)],
        ["Submitted On", formatDate(appeal.created_at)]
    ]

    return (
        <div className='grid grid-cols-2 gap-1'>
            <div className='flex justify-between items-center col-span-2 mb-2'>
                <p className='font-semibold'>Appeal Summary</p>
                <p className={statusStyles[appeal.status]}>
                    {capitalize(appeal.status)}
                </p>
            </div>

            {rows.map(([label, value]) => (
                <div
                    key={label}
                    className='grid sm:grid-cols-2'
                >
                    <p className='text-xs text-secondary-light dark:text-secondary-dark py-1.5'>
                        {label}
                    </p>
                    <p className='text-sm text-primary-light dark:text-primary-dark py-1.5 break-all'>
                        {value}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default AppealDetailsSummary
