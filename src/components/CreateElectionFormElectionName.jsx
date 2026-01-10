import { useFormContext } from "react-hook-form"
import { IoIosInformationCircleOutline } from "react-icons/io"
import InfoTooltip from "./InfoTooltip"

const CreateElectionFormElectionName = ({ disabled }) => {
    const {
        register,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
                <label htmlFor='election-name'>
                    Election Name <span className='text-red-500'>*</span>
                </label>
                {disabled && (
                    <InfoTooltip
                        message={
                            "Election name can only be edited while the election is in Draft."
                        }
                    />
                )}
            </div>
            <div className='space-y-1'>
                <input
                    type='text'
                    id='election-name'
                    className={`outline-none border-none rounded-md w-full h-10 px-3 placeholder:text-secondary-light dark:placeholder:text-secondary-dark ${
                        disabled
                            ? "cursor-not-allowed bg-[#c0c0c2] dark:bg-[#2a2e34] text-[#454649] dark:text-[#c7cad2]"
                            : "bg-field-light dark:bg-field-dark text-primary-light dark:text-primary-dark"
                    }`}
                    placeholder='Enter the name of the election'
                    disabled={disabled}
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
