import { useNotificationStore } from "../stores"
import Notification from "../components/Notification"
import NotificationFilterAndSort from "../components/NotificationFilterAndSort"
import { useMemo, useState } from "react"

const Notifications = () => {
    const [filter, setFilter] = useState("all")
    const [sort, setSort] = useState("latest")

    const { notifications, markRead } = useNotificationStore()

    const visibleNotifications = useMemo(() => {
        let list = [...notifications]

        // sort
        if (sort === "oldest") {
            list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        } else if (sort === "latest") {
            list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }

        // filter by type
        if (filter !== "all") {
            list = list.filter((l) => l.type.toLowerCase() === filter)
        }

        return list
    }, [notifications, filter, sort])

    return (
        <div className='flex flex-col items-center px-2 md:px-5 lg:px-9 pb-5 pt-8 flex-1'>
            <title>Notifications</title>
            <div className='flex flex-col w-full gap-5 max-w-4xl'>
                {notifications?.length > 0 && (
                    <NotificationFilterAndSort
                        sort={sort}
                        setSort={setSort}
                        filter={filter}
                        setFilter={setFilter}
                    />
                )}
                {visibleNotifications?.length > 0 && (
                    <div className='flex flex-col px-3 py-4 gap-8 rounded-md dark:bg-card-dark bg-card-light shadow-lg text-primary-light dark:text-primary-dark'>
                        <div className='flex flex-col gap-3'>
                            {visibleNotifications.map((notification) => (
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
            </div>
            {!visibleNotifications.length && (
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
