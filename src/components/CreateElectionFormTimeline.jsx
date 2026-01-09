import { useFormContext, Controller } from "react-hook-form"
import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"

const CreateElectionFormTimeline = () => {
    const {
        control,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-base font-semibold'>Timeline</h3>
            <div className='grid md:grid-cols-2 gap-2 md:gap-4'>
                <div className='flex flex-col gap-2'>
                    <p>
                        Nomination Start <span className='text-red-500'>*</span>
                    </p>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='nominationStartDate'
                                control={control}
                                rules={{
                                    required:
                                        "Nomination start date is required"
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.nominationStartDate && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.nominationStartDate?.message}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='nominationStartTime'
                                control={control}
                                rules={{
                                    required:
                                        "Nomination start time is required"
                                }}
                                render={({ field }) => (
                                    <TimePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.nominationStartTime && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.nominationStartTime?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>
                        Nomination End <span className='text-red-500'>*</span>
                    </p>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='nominationEndDate'
                                control={control}
                                rules={{
                                    required: "Nomination end date is required"
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.nominationEndDate && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.nominationEndDate?.message}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='nominationEndTime'
                                control={control}
                                rules={{
                                    required: "Nomination end time is required"
                                }}
                                render={({ field }) => (
                                    <TimePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.nominationEndTime && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.nominationEndTime?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>
                        Voting Start <span className='text-red-500'>*</span>
                    </p>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='votingStartDate'
                                control={control}
                                rules={{
                                    required: "Voting start date is required"
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.votingStartDate && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.votingStartDate?.message}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='votingStartTime'
                                control={control}
                                rules={{
                                    required: "Voting start time is required"
                                }}
                                render={({ field }) => (
                                    <TimePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.votingStartTime && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.votingStartTime?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>
                        Voting End <span className='text-red-500'>*</span>
                    </p>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='votingEndDate'
                                control={control}
                                rules={{
                                    required: "Voting end date is required"
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.votingEndDate && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.votingEndDate?.message}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='votingEndTime'
                                control={control}
                                rules={{
                                    required: "Voting end time is required"
                                }}
                                render={({ field }) => (
                                    <TimePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.votingEndTime && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.votingEndTime?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <p>
                        Election End <span className='text-red-500'>*</span>
                    </p>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='electionEndDate'
                                control={control}
                                rules={{
                                    required: "Election end date is required"
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.electionEndDate && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.electionEndDate?.message}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <Controller
                                name='electionEndTime'
                                control={control}
                                rules={{
                                    required: "Election end time is required"
                                }}
                                render={({ field }) => (
                                    <TimePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors?.electionEndTime && (
                                <p className='text-xs text-red-500 mt-1 font-medium'>
                                    {errors?.electionEndTime?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateElectionFormTimeline
