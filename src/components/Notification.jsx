import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { IoWarningOutline } from "react-icons/io5"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

dayjs.extend(relativeTime)

const timeAgo = (date) => {
    return dayjs(date).fromNow()
}

const Notification = ({ notification }) => {
    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-md ${
                notification?.id % 2 === 0
                    ? "dark:bg-[#16171d] bg-[#c4c9d4] text-primary-light dark:text-primary-dark"
                    : "dark:bg-bg-dark bg-bg-light text-primary-light dark:text-primary-dark"
            }`}
        >
            <div>
                {notification?.type === "info" && (
                    <IoMdInformationCircleOutline className='text-blue-500 text-xl' />
                )}
                {notification?.type === "warning" && (
                    <IoWarningOutline className='text-yellow-300 text-xl' />
                )}
                {notification?.type === "success" && (
                    <IoMdCheckmarkCircleOutline className='text-green-500 text-xl' />
                )}
            </div>
            <div className='flex flex-col gap-0.5'>
                <p>{notification?.message}</p>
                <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                    {timeAgo(notification?.createdAt)}
                </p>
            </div>
        </div>
    )
}

export default Notification
