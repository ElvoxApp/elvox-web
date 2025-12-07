import { useAuthStore } from "../stores"

const fields = ["name", "id", "dept", "class", "sem", "batch", "email", "phone"]

const labels = {
    name: "Full Name",
    id: "Admission Number",
    dept: "Department",
    class: "Class",
    sem: "Semester",
    batch: "Batch",
    email: "Email",
    phone: "Phone"
}

const CandidateDetails = () => {
    const { user } = useAuthStore()
    return (
        <div className='flex justify-center sm:flex-1 border rounded-md border-gray-500 px-3 py-[18px] overflow-y-scroll custom-scrollbar'>
            <div className='flex flex-col divide-y divide-gray-500 w-full'>
                <div className='flex flex-col justify-center items-center gap-2 py-2'>
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className='rounded-full'
                        width={80}
                    />
                    <p className='text-center'>{user?.name}</p>
                </div>
                <div className='flex flex-col justify-center gap-2 pt-3'>
                    {fields.map((field) => (
                        <div
                            className='flex flex-col gap-1'
                            key={field}
                        >
                            <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                                {labels[field]}
                            </p>
                            <p className='text-sm text-primary-light dark:text-primary-dark'>
                                {field === "phone"
                                    ? `+91 ${user[field]}`
                                    : user[field]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CandidateDetails
