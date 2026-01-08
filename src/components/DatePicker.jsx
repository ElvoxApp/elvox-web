import { useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import "react-day-picker/dist/style.css"
import { MdOutlineCalendarToday } from "react-icons/md"

export default function DateTimePicker({
    value,
    onChange,
    placeholder = "Select date"
}) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(value ?? null)

    const commit = (nextDate, nextTime) => {
        if (!nextDate || !nextTime) return

        const [h, m] = nextTime.split(":").map(Number)
        const merged = new Date(nextDate)
        merged.setHours(h)
        merged.setMinutes(m)
        merged.setSeconds(0)

        setDate(merged)
        onChange?.(merged)
    }

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
                        {date ? (
                            format(date, "dd MMM yyyy")
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
                    className='z-50 rounded-lg bg-field-light dark:bg-field-dark p-3 shadow-lg'
                >
                    <DayPicker
                        mode='single'
                        animate
                        navLayout='around'
                        selected={date}
                        onSelect={(d) => {
                            setDate(d)
                            commit(d)
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
