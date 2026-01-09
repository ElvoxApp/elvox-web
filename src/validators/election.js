import { toEpoch } from "../utils/datetime"

const editableFieldsByStatus = {
    draft: [
        "nominationStart",
        "nominationEnd",
        "votingStart",
        "votingEnd",
        "electionEnd"
    ],
    nominations: ["nominationEnd", "votingStart", "votingEnd", "electionEnd"],
    pre_voting: ["votingStart", "votingEnd", "electionEnd"],
    voting: ["votingEnd", "electionEnd"],
    post_voting: ["electionEnd"],
    closed: []
}

const isEditable = (status, field) => {
    if (!status) return true
    return editableFieldsByStatus[status]?.includes(field)
}

export const createElectionResolver = (status) => async (values) => {
    const errors = {}
    const now = Date.now()

    if (!values.electionName?.trim()) {
        errors.electionName = {
            type: "required",
            message: "Election name is required"
        }
    }

    const ts = {
        nominationStart: toEpoch(
            values.nominationStartDate,
            values.nominationStartTime
        ),
        nominationEnd: toEpoch(
            values.nominationEndDate,
            values.nominationEndTime
        ),
        votingStart: toEpoch(values.votingStartDate, values.votingStartTime),
        votingEnd: toEpoch(values.votingEndDate, values.votingEndTime),
        electionEnd: toEpoch(values.electionEndDate, values.electionEndTime)
    }

    /* ---------- required date / time ---------- */
    for (const key of Object.keys(ts)) {
        if (!isEditable(status, key)) continue

        if (!values[`${key}Date`]) {
            errors[`${key}Date`] = {
                type: "required",
                message: "Date is required"
            }
        }

        if (!values[`${key}Time`]) {
            errors[`${key}Time`] = {
                type: "required",
                message: "Time is required"
            }
        }
    }

    /* ---------- nominationStart must be future ---------- */
    if (
        isEditable(status, "nominationStart") &&
        !errors.nominationStartTime &&
        ts.nominationStart <= now
    ) {
        errors.nominationStartTime = {
            type: "validate",
            message: "Nomination start must be in the future"
        }
    }

    /* ---------- strict ordering ---------- */
    const rules = [
        [
            "nominationStart",
            "nominationEnd",
            "Nomination end must be after nomination start"
        ],
        [
            "nominationEnd",
            "votingStart",
            "Voting must start after nominations end"
        ],
        ["votingStart", "votingEnd", "Voting end must be after voting start"],
        ["votingEnd", "electionEnd", "Election end must be after voting ends"]
    ]

    for (const [a, b, message] of rules) {
        if (!isEditable(status, b)) continue

        if (
            !errors[`${b}Time`] &&
            !Number.isNaN(ts[a]) &&
            !Number.isNaN(ts[b]) &&
            ts[a] >= ts[b]
        ) {
            errors[`${b}Time`] = {
                type: "validate",
                message
            }
        }
    }

    return { values, errors }
}
