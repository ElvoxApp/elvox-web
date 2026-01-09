import { useFormContext } from "react-hook-form"

const CreateElectionFormElectionName = () => {
    const {
        register,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor='election-name'>
                Election Name <span className='text-red-500'>*</span>
            </label>
            <div className='space-y-1'>
                <input
                    type='text'
                    id='election-name'
                    className='outline-none border-none bg-field-light dark:bg-field-dark
                 rounded-md w-full h-10 px-3
                 text-primary-light dark:text-primary-dark
                 placeholder:text-secondary-light dark:placeholder:text-secondary-dark'
                    placeholder='Enter the name of the election'
                    {...register("electionName", {
                        required: "Election name is required"
                    })}
                />
                {errors?.electionName && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.electionName?.message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default CreateElectionFormElectionName
