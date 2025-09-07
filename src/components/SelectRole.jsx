import { Controller, useFormContext } from "react-hook-form"
import * as Select from "@radix-ui/react-select"
import {
    ChevronDownIcon,
    ChevronUpIcon,
    CheckIcon
} from "@radix-ui/react-icons"

const SelectRole = () => {
    const {
        control,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col gap-2'>
            <label
                htmlFor='role'
                className='text-primary'
            >
                Role
            </label>
            <Controller
                name='role'
                control={control}
                defaultValue='student' // MUST CHANGE BACK TO EMPTY STRING FOR PRODUCTION
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                    <Select.Root
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <Select.Trigger
                            id='role'
                            className={`flex items-center justify-between w-full h-11 rounded-md px-3 text-sm outline-none bg-field text-primary border-none focus:ring-2 focus:ring-accent cursor-pointer x ${
                                errors.role ? "ring-2 ring-red-400" : ""
                            }`}
                        >
                            <Select.Value placeholder='Select role' />
                            <Select.Icon>
                                <ChevronDownIcon />
                            </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                            <Select.Content className='rounded-md bg-field text-primary shadow-md border overflow-hidden'>
                                <Select.ScrollUpButton className='flex items-center justify-center p-1'>
                                    <ChevronUpIcon />
                                </Select.ScrollUpButton>

                                <Select.Viewport className='p-2'>
                                    <Select.Item
                                        value='student'
                                        className='cursor-pointer px-2 py-1 rounded flex items-center justify-between hover:bg-accent outline-none'
                                    >
                                        <Select.ItemText>
                                            Student
                                        </Select.ItemText>
                                        <Select.ItemIndicator className=''>
                                            <CheckIcon />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                    <Select.Item
                                        value='teacher'
                                        className='cursor-pointer px-2 py-1 flex justify-between items-center rounded hover:bg-accent outline-none'
                                    >
                                        <Select.ItemText>
                                            Teacher
                                        </Select.ItemText>
                                        <Select.ItemIndicator className=''>
                                            <CheckIcon />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                </Select.Viewport>

                                <Select.ScrollDownButton className='flex items-center justify-center p-1'>
                                    <ChevronDownIcon />
                                </Select.ScrollDownButton>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                )}
            />
            {errors.role && (
                <p className='text-xs text-red-500 mt-1 font-medium'>
                    {errors.role.message}
                </p>
            )}
        </div>
    )
}

export default SelectRole
