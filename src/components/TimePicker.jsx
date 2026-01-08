import { useState, useRef, useEffect } from "react"
import * as Popover from "@radix-ui/react-popover"
import { GoClock } from "react-icons/go"

const DEFAULT_TIME = { hour: "1", minute: "00", period: "AM" }

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
)
const periods = ["AM", "PM"]

const TimePicker = ({ value, onChange, placeholder = "Select time" }) => {
    const [open, setOpen] = useState(false)
    const [draftTime, setDraftTime] = useState(DEFAULT_TIME)
    const [committed, setCommitted] = useState(false)

    const commitTime = () => {
        const timeString = `${draftTime.hour}:${draftTime.minute} ${draftTime.period}`
        onChange?.(timeString)
        setCommitted(true)
        setOpen(false)
    }

    useEffect(() => {
        if (!open) return

        if (value) {
            const [h, rest] = value.split(":")
            const [m, p] = rest.split(" ")

            setDraftTime({ hour: h, minute: m, period: p })
        } else {
            setDraftTime(DEFAULT_TIME)
        }
    }, [open, value])

    return (
        <div className='flex-1'>
            <Popover.Root
                open={open}
                onOpenChange={(v) => {
                    if (!v && open) commitTime()
                    setOpen(v)
                }}
            >
                <Popover.Trigger asChild>
                    <button
                        type='button'
                        className='w-full rounded-md px-3 py-2 text-left text-sm shadow-sm hover:bg-[#c4c4c9] dark:hover:bg-[#2b303b] focus:outline-none cursor-pointer bg-field-light dark:bg-field-dark'
                    >
                        <p className='flex items-center gap-2'>
                            <GoClock className='text-secondary-light dark:text-secondary-dark' />
                            <span
                                className={
                                    committed
                                        ? "text-primary-light dark:text-primary-dark"
                                        : "text-secondary-light dark:text-secondary-dark"
                                }
                            >
                                {committed ? value : placeholder}
                            </span>
                        </p>
                    </button>
                </Popover.Trigger>

                <Popover.Content
                    sideOffset={8}
                    className='z-50 rounded-lg bg-field-light dark:bg-field-dark py-3 shadow-lg border border-zinc-200 dark:border-zinc-800'
                >
                    <div className='flex flex-col items-center justify-center text-primary-light dark:text-primary-dark'>
                        <div className='relative flex overflow-hidden h-56 w-44 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]'>
                            <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-black/5 dark:bg-white/5 pointer-events-none border-y border-black/10 dark:border-white/10' />

                            <ScrollColumn
                                items={hours}
                                value={draftTime.hour}
                                onSelect={(v) =>
                                    setDraftTime((t) => ({ ...t, hour: v }))
                                }
                            />
                            <ScrollColumn
                                items={minutes}
                                value={draftTime.minute}
                                onSelect={(v) =>
                                    setDraftTime((t) => ({ ...t, minute: v }))
                                }
                            />
                            <ScrollColumn
                                items={periods}
                                value={draftTime.period}
                                onSelect={(v) =>
                                    setDraftTime((t) => ({ ...t, period: v }))
                                }
                            />
                        </div>

                        <button
                            onClick={commitTime}
                            className='mt-2 text-xs font-semibold text-[#ab8cff] hover:text-[#956fff] cursor-pointer py-1 w-full'
                        >
                            Done
                        </button>
                    </div>
                </Popover.Content>
            </Popover.Root>
        </div>
    )
}

const ScrollColumn = ({ items, onSelect, value }) => {
    const scrollRef = useRef(null)
    const isManualScrolling = useRef(false)
    const itemHeight = 48

    useEffect(() => {
        if (!scrollRef.current || !value || isManualScrolling.current) return
        const index = items.indexOf(value)
        if (index !== -1) {
            scrollRef.current.scrollTop = index * itemHeight
        }
    }, [value, items])

    const handleItemClick = (index) => {
        if (!scrollRef.current) return

        isManualScrolling.current = true

        scrollRef.current.scrollTo({
            top: index * itemHeight,
            behavior: "smooth"
        })

        setTimeout(() => {
            isManualScrolling.current = false
            onSelect(items[index])
        }, 300)
    }

    const handleScroll = () => {
        if (!scrollRef.current || isManualScrolling.current) return

        const scrollTop = scrollRef.current.scrollTop
        const centerIndex = Math.round(scrollTop / itemHeight)

        if (items[centerIndex] && items[centerIndex] !== value) {
            onSelect(items[centerIndex])
        }
    }

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            className='flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide py-[88px]'
            style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                height: "224px"
            }}
        >
            {items.map((item, idx) => (
                <div
                    key={idx}
                    onClick={() => handleItemClick(idx)}
                    className='h-12 flex items-center justify-center text-lg font-medium snap-center cursor-pointer hover:text-[#ab8cff] transition-colors'
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

export default TimePicker
