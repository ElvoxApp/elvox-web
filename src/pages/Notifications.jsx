import { useNotificationStore } from "../stores"
import Notification from "../components/Notification"

const Notifications = () => {
    const { notifications, markRead } = useNotificationStore()

    return (
        <div className='flex justify-center px-2 md:px-5 lg:px-9 pb-5 pt-8 flex-1'>
            <title>Notifications</title>
            {notifications?.length > 0 && (
                <div className='flex flex-col flex-1 px-4 py-6 gap-8 rounded-md dark:bg-card-dark bg-card-light shadow-lg text-primary-light dark:text-primary-dark max-w-4xl'>
                    <div className='flex flex-col gap-3'>
                        {notifications.map((notification) => (
                            <Notification
                                key={notification.id}
                                notification={notification}
                                markRead={markRead}
                                showDate
                                showUnread
                            />
                        ))}
                    </div>
                </div>
            )}
            {!notifications.length && (
                <div className='flex px-3 py-4 flex-1 items-center justify-center'>
                    <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black w-[20ch]'>
                        No Notifications To Show
                    </h2>
                </div>
            )}
        </div>
    )
}

export default Notifications
