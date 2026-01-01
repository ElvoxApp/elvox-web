import SelectCategory from "./SelectCategory"
import Nominee from "./Nominee"
import ImageInput from "./ImageInput"
import SelectElection from "./SelectElection"
import { useFormContext } from "react-hook-form"

const CandidateFormContent = ({ setIsLoading }) => {
    const {
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col flex-1 min-h-0 gap-3 w-full text-sm overflow-y-auto custom-scrollbar'>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='election_id'
                    className='text-primary-light dark:text-primary-dark'
                >
                    Election
                </label>
                <SelectElection />
                {errors?.election_id && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.election_id?.message}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='category'
                    className='text-primary-light dark:text-primary-dark'
                >
                    Category
                </label>
                <SelectCategory />
                {errors?.category && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.category?.message}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='signature'
                    className='text-primary-light dark:text-primary-dark'
                >
                    Candidate Signature
                </label>
                <ImageInput
                    name='signature'
                    label='Signature'
                />
                {errors?.signature && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.signature?.message}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <p>Nominee 1</p>
                <Nominee
                    number={1}
                    setIsLoading={setIsLoading}
                />
                {errors?.nominee1 && Object.values(errors.nominee1)[0] && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.nominee1 &&
                            Object.values(errors.nominee1)[0]?.message}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <p>Nominee 2</p>
                <Nominee
                    number={2}
                    setIsLoading={setIsLoading}
                />
                {errors?.nominee2 && Object.values(errors.nominee2)[0] && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.nominee2 &&
                            Object.values(errors.nominee2)[0]?.message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default CandidateFormContent
