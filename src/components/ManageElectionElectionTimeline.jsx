import { useElectionStore } from "../stores"

const formatDate = (value) => {
    if (!value) return "—"
    return new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    })
}

const getProgressPercent = (start, end) => {
    if (!start || !end) return 0

    const now = Date.now()
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()

    if (now <= startTime) return 0
    if (now >= endTime) return 100

    return Math.round(((now - startTime) / (endTime - startTime)) * 100)
}

const stepIndexes = {
    draft: 0,
    nominations: 1,
    "pre-voting": 2,
    voting: 3,
    "post-voting": 4,
    closed: 5
}

const ManageElectionElectionTimeline = () => {
    const { election } = useElectionStore()

    const steps = [
        {
            title: "Election Setup",
            description: "Initial configuration and rule setting",
            start: election?.election_start,
            end: election?.nomination_start
        },
        {
            title: "Nominations Open",
            description: "Candidate applications submission and review phase",
            start: election?.nomination_start,
            end: election?.nomination_end
        },
        {
            title: "Pre-Voting",
            description: "Voting preparation and secret key generation window",
            start: election?.nomination_end,
            end: election?.voting_start
        },
        {
            title: "Voting Open",
            description: "Voting is open for eligible voters",
            start: election?.voting_start,
            end: election?.voting_end
        },
        {
            title: "Post-Voting",
            description:
                "Post-voting transition period, appeals, and result access",
            start: election?.voting_end,
            end: election?.election_end
        },
        {
            title: "Election Closed",
            description: "Election records finalized and archived",
            start: election?.election_end
        }
    ]

    const currentStepIndex = stepIndexes[election?.status] ?? 0
    const currentStep = steps[currentStepIndex]

    const progressPercent = currentStep?.end
        ? getProgressPercent(currentStep.start, currentStep.end)
        : 100

    const segmentHeight = 100 / (steps.length - 1)
    const totalProgressHeight =
        currentStepIndex >= steps.length - 1
            ? 100
            : currentStepIndex * segmentHeight +
              (progressPercent / 100) * segmentHeight

    return (
        <div className='flex flex-col w-full px-4 pt-4 rounded-md border border-gray-500 text-primary-light dark:text-primary-dark shadow-lg transition-all duration-100'>
            <div className='flex flex-col gap-2 max-w-4xl'>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-left text-primary-light dark:text-primary-dark text-base'>
                        Election Timeline
                    </p>
                    <p className='text-secondary-light dark:text-secondary-dark'>
                        Status progression and scheduling overview
                    </p>
                </div>
                <div className='p-4 sm:p-8 font-sans antialiased text-primary-light dark:text-primary-dark'>
                    <div className='max-w-3xl mx-auto'>
                        <div className='relative'>
                            <div
                                className='absolute left-[15px] sm:left-[23px] top-3 w-0.5 overflow-visible bg-gray-500/30 dark:bg-gray-500/50'
                                style={{
                                    height: `${
                                        ((steps.length - 1) / steps.length) *
                                        100
                                    }%`
                                }}
                            >
                                <div
                                    className='absolute top-0 left-0 w-full bg-accent transition-all duration-700 ease-out'
                                    style={{
                                        height: `${Math.min(
                                            totalProgressHeight,
                                            100
                                        )}%`
                                    }}
                                />

                                {/* Pulsing Indicator at the current progress tip */}
                                <div
                                    className='absolute bottom-full left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-700 ease-out'
                                    style={{
                                        top: `${Math.min(
                                            totalProgressHeight,
                                            100
                                        )}%`
                                    }}
                                >
                                    <div className='absolute mt-[1px] w-9 h-9 bg-accent/80 rounded-full animate-pulse-ring' />
                                    <div className='w-2.5 h-2.5 bg-accent rounded-full shadow-sm animate-pulse-dot' />
                                </div>
                            </div>

                            {/* Steps */}
                            <div
                                className='grid gap-y-2 -mb-10'
                                style={{
                                    gridTemplateRows: `repeat(${steps.length}, minmax(80px, 1fr))`
                                }}
                            >
                                {steps.map((step, index) => {
                                    const isPast = index < currentStepIndex
                                    const isCurrent = index === currentStepIndex
                                    const isFuture = index > currentStepIndex

                                    return (
                                        <div
                                            key={index}
                                            className='relative flex items-start group'
                                        >
                                            {/* Left Column: Indicator */}
                                            <div className='flex-shrink-0 w-8 sm:w-12 flex justify-center mt-1.5 z-10'>
                                                {isPast && (
                                                    <div className='w-4 h-4 rounded-full bg-accent shadow-sm' />
                                                )}
                                                {isCurrent && (
                                                    <div className='w-5 h-5 rounded-full bg-accent border-4 border-bg-light dark:border-bg-dark ring-2 ring-accent shadow-md' />
                                                )}
                                                {isFuture && (
                                                    <div className='w-4 h-4 rounded-full bg-bg-light dark:bg-bg-dark border-2 border-gray-300 dark:border-slate-700' />
                                                )}
                                            </div>

                                            {/* Right Column: Content */}
                                            <div
                                                className={`ml-4 sm:ml-8 flex-1 pb-2 ${
                                                    isFuture
                                                        ? "opacity-50"
                                                        : "opacity-100"
                                                }`}
                                            >
                                                <div className='flex flex-col gap-1 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-20 sm:items-baseline mb-1'>
                                                    <p
                                                        className={`text-sm font-semibold ${
                                                            isCurrent
                                                                ? "text-[#ab8cff]"
                                                                : "text-primary-light dark:text-primary-dark"
                                                        }`}
                                                    >
                                                        {step?.title}
                                                    </p>
                                                    <span className='text-xs font-medium uppercase tracking-wider text-secondary-light dark:text-secondary-dark'>
                                                        {formatDate(
                                                            step?.start
                                                        )}
                                                        {step?.end
                                                            ? ` — ${formatDate(
                                                                  step?.end
                                                              )}`
                                                            : ""}
                                                    </span>
                                                </div>
                                                <p className='text-secondary-light dark:text-secondary-dark text-sm leading-relaxed'>
                                                    {step?.description}
                                                </p>

                                                {isCurrent && (
                                                    <div className='mt-3 flex items-center space-x-2'>
                                                        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#ab8cff]/30 dark:bg-[#ab8cff]/20 text-[#ab8cff] uppercase tracking-wide'>
                                                            Active Phase
                                                        </span>
                                                        <span className='text-xs text-secondary-light dark:text-secondary-dark italic'>
                                                            {progressPercent}%
                                                            through this stage
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageElectionElectionTimeline
