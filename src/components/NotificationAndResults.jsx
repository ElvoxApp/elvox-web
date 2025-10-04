import { useState } from "react"
import Button from "./Button"
import Notification from "./Notification"
import Result from "./Result"

const NotificationAndResults = () => {
    const [activeTab, setActiveTab] = useState("notifications")
    /* MUST CHANGE FOR PRODUCTION - FETCH FROM BACKEND */
    const notifications = [
        {
            id: 1,
            message: "Election starts in 2 days!",
            createdAt: "2025-10-04T16:14:30.488Z",
            type: "info"
        },
        {
            id: 2,
            message: "New candidate Jane Doe verified",
            createdAt: "2025-10-04T08:42:30.488Z",
            type: "success"
        },
        {
            id: 3,
            message: "Candidate register period extended until Nov 15, 2025",
            createdAt: "2025-10-01T14:06:30.488Z",
            type: "warning"
        }
    ]

    const sortedNotifications = [...notifications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)

    const results = []
    /* ------------------------------------ */

    return (
        <div className='flex flex-col w-full gap-3 px-3 py-4 rounded-md bg-card min-h-52'>
            <div className='flex items-center gap-2'>
                <Button
                    className={`p-2 flex-1 ${
                        activeTab === "notifications"
                            ? "bg-accent hover:bg-button-hover"
                            : "bg-secondary-button hover:bg-secondary-button-hover"
                    }`}
                    onClick={() => setActiveTab("notifications")}
                >
                    Notifications
                </Button>
                <Button
                    className={`p-2 flex-1 ${
                        activeTab === "results"
                            ? "bg-accent hover:bg-button-hover"
                            : "bg-secondary-button hover:bg-secondary-button-hover"
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
                    <div className='flex items-center justify-center text-primary text-base py-10'>
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
                    <div className='flex items-center justify-center text-primary text-base py-10'>
                        <p>No results to show!</p>
                    </div>
                )
            )}
        </div>
    )
}

export default NotificationAndResults
