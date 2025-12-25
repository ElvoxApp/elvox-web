import { useEffect, useState } from "react"
import ProfileItem from "../components/ProfileItem"
import ProfileSection from "../components/ProfileSection"
import { useAuthStore } from "../stores"
import capitalize from "../utils/capitalize"
import api from "../api/api"

const formatDate = (value) =>
    new Date(value)
        .toLocaleString("en-IN", {
            dateStyle: "medium"
        })
        .replace(/\b(am|pm)\b/, (m) => m.toUpperCase())

const yearsMap = {
    1: "First Year",
    2: "First Year",
    3: "Second Year",
    4: "Second Year",
    5: "Third Year",
    6: "Third Year",
    7: "Fourth Year",
    8: "Fourth Year"
}

const roleToProfileType = {
    student: "student",
    teacher: "staff",
    supervisor: "staff",
    admin: "staff"
}

const profileFields = {
    student: {
        personal: [
            { key: "admno", label: "Admission Number" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" }
        ],

        academic: [
            { key: "department", label: "Department" },
            { key: "class", label: "Class" },
            {
                key: "year",
                label: "Year",
                getValue: (user) => {
                    const sem = Number(user.semester)
                    return yearsMap[sem] ?? "-"
                }
            },
            { key: "semester", label: "Semester" },
            { key: "batch", label: "Batch" }
        ],

        account: [
            {
                key: "created_at",
                label: "Account Created On",
                format: formatDate
            }
        ]
    },

    staff: {
        personal: [
            { key: "empcode", label: "Employee Code" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" }
        ],

        professional: [
            { key: "department", label: "Department" },
            {
                key: "tutor_of",
                label: "Tutor Of",
                getValue: (_, extra) => extra.tutorClassName ?? "Not Assigned"
            }
        ],

        account: [
            {
                key: "created_at",
                label: "Account Created On",
                format: formatDate
            }
        ]
    }
}

const Profile = () => {
    const [tutorClassName, setTutorClassName] = useState(null)

    const { user } = useAuthStore()

    const profileType = roleToProfileType[user.role]
    const profileField = profileFields[profileType]

    useEffect(() => {
        if (user.role === "student") return

        if (!user.tutor_of) return

        const fetchClass = async () => {
            const res = await api.get(`/classes/${user.tutor_of}`)
            setTutorClassName(res.data.name)
        }

        fetchClass()
    }, [user])

    return (
        <div className='flex justify-center px-1 pb-5 pt-8 flex-1'>
            <div className='flex flex-col w-full px-4 py-6 rounded-lg dark:bg-card-dark bg-card-light shadow-lg text-primary-light dark:text-primary-dark max-w-4xl'>
                <div className='flex flex-col gap-3 justify-center items-center'>
                    <img
                        src={user?.profile_pic}
                        alt={user?.name}
                        className='w-24 rounded-full'
                    />
                    <p className='text-xl font-bold'>{user?.name}</p>
                    <p className='rounded-2xl text-sm px-3 py-1 bg-purple-600/20 text-purple-600/90 dark:bg-purple-600/30 dark:text-purple-300'>
                        {capitalize(user?.role)}
                    </p>
                </div>
                <div className='flex flex-col pt-8 px-3 gap-6'>
                    {Object.entries(profileField).map(([section, fields]) => (
                        <ProfileSection
                            key={section}
                            title={capitalize(section)}
                        >
                            {fields.map((f, i) => (
                                <ProfileItem
                                    key={f.key ?? f.label}
                                    label={f.label}
                                    value={
                                        f.getValue
                                            ? f.getValue(user, {
                                                  tutorClassName
                                              })
                                            : f.format
                                            ? f.format(user[f.key])
                                            : user[f.key]
                                    }
                                    isLast={i === fields.length - 1}
                                />
                            ))}
                        </ProfileSection>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
