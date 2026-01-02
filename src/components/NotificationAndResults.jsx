import { useState } from "react"
import Button from "./Button"
import Notification from "./Notification"
import Result from "./Result"
import { useNotificationStore } from "../stores"

const NotificationAndResults = () => {
    const [activeTab, setActiveTab] = useState("notifications")

    const { notifications } = useNotificationStore()

    const sortedNotifications = [...notifications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)

    const results = []
    /* ------------------------------------ */

    return (
        <div className='flex flex-col w-full gap-3 px-3 py-4 rounded-md bg-card-light dark:bg-card-dark min-h-52 shadow-lg transition-all duration-100'>
            <div className='flex items-center gap-2'>
                <Button
                    className={`px-2 py-2 lg:py-3 flex-1 ${
                        activeTab === "notifications"
                            ? "bg-accent hover:bg-button-hover"
                            : "bg-secondary-button hover:bg-secondary-button-hover-light dark:hover:bg-secondary-button-hover"
                    }`}
                    onClick={() => setActiveTab("notifications")}
                >
                    Notifications
                </Button>
                <Button
                    className={`px-2 py-2 lg:py-3 flex-1 ${
                        activeTab === "results"
                            ? "bg-accent hover:bg-button-hover"
                            : "bg-secondary-button hover:bg-secondary-button-hover-light dark:hover:bg-secondary-button-hover"
                    }`}
                    onClick={() => setActiveTab("results")}
                >
                    Results
                </Button>
            </div>
            {activeTab === "notifications" && sortedNotifications.length > 0 ? (
                <div className='flex flex-col gap-2'>
                    {sortedNotifications.map((notification) => (
                        <Notification
                            key={notification?.id}
                            notification={notification}
                        />
                    ))}
                </div>
            ) : (
                activeTab === "notifications" && (
                    <div className='flex items-center justify-center text-primary-light dark:text-primary-dark text-base py-10'>
                        <p>No notifications to show!</p>
                    </div>
                )
            )}
            {activeTab === "results" && results.length > 0 ? (
                <div className='flex flex-col gap-2'>
                    {results.map((result) => (
                        <Result
                            key={result?.id}
                            result={result}
                        />
                    ))}
                </div>
            ) : (
                activeTab === "results" && (
                    <div className='flex items-center justify-center text-primary-light dark:text-primary-dark text-base py-10'>
                        <p>No results to show!</p>
                    </div>
                )
            )}
        </div>
    )
}

export default NotificationAndResults
