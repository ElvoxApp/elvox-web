import { useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import "react-day-picker/dist/style.css"
import { MdOutlineCalendarToday } from "react-icons/md"

const DatePicker = ({ value, onChange, placeholder = "Select date" }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='flex-1 sm:flex-2 md:flex-1'>
            <Popover.Root
                open={open}
                onOpenChange={setOpen}
            >
                <Popover.Trigger asChild>
                    <button
                        type='button'
                        className='w-full rounded-md px-3 py-2 text-left text-sm shadow-sm hover:bg-[#c4c4c9] dark:hover:bg-[#2b303b] focus:outline-none cursor-pointer bg-field-light dark:bg-field-dark'
                    >
                        {value ? (
                            format(value, "dd MMM yyyy")
                        ) : (
                            <p className='flex items-center gap-2'>
                                <MdOutlineCalendarToday className='text-secondary-light dark:text-secondary-dark' />
                                <span className='text-secondary-light dark:text-secondary-dark'>
                                    {placeholder}
                                </span>
                            </p>
                        )}
                    </button>
                </Popover.Trigger>

                <Popover.Content
                    sideOffset={8}
                    align='start'
                    collisionPadding={15}
                    avoidCollisions
                    className='z-50 rounded-lg bg-field-light dark:bg-field-dark p-3 shadow-lg max-w-[calc(100vw-32px)]'
                >
                    <DayPicker
                        mode='single'
                        animate
                        navLayout='around'
                        selected={value}
                        onSelect={(d) => {
                            onChange?.(d)
                        }}
                        style={{
                            "--rdp-accent-color": "var(--color-accent)",
                            "--rdp-accent-background-color":
                                "color-mix(in oklab, var(--color-accent) 15%, transparent)"
                        }}
                        className='[&_.rdp-today]:font-black [&_.rdp-today]:text-base'
                    />
                </Popover.Content>
            </Popover.Root>
        </div>
    )
}

export default DatePicker
