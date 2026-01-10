import * as Tooltip from "@radix-ui/react-tooltip"
import { IoIosInformationCircleOutline } from "react-icons/io"

const InfoTooltip = ({ message }) => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <button
                    type='button'
                    className='inline-flex items-center'
                    onClick={(e) => e.preventDefault()}
                >
                    <IoIosInformationCircleOutline className='w-3.5 h-3.5' />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    side='top'
                    align='center'
                    className='z-[9999] max-w-xs rounded-md bg-field-light dark:bg-field-dark text-primary-light dark:text-primary-dark text-xs px-3 py-1 shadow-lg'
                >
                    {message}
                    <Tooltip.Arrow className='dark:fill-field-dark fill-field-light' />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    )
}

export default InfoTooltip
