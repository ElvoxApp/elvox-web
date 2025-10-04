import React from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import ElectionDetails from "../components/ElectionDetails"
import DashboardOptionsStudent from "../components/DashboardOptionsStudent"
import NotificationAndResults from "../components/NotificationAndResults"

const Dashboard = () => {
    return (
        <div className='flex flex-col py-3 px-4'>
            <title>Dashboard</title>
            <Header title='Dashboard' />
            <div className='flex flex-col px-3 py-5 sm:px-6 sm:py-6 justify-center '>
                <h1 className='text-2xl font-semibold max-sm:hidden text-left'>
                    Dashboard
                </h1>
                <div className='flex flex-col gap-6 sm:py-4 sm:px-7 text-sm'>
                    <ElectionDetails />
                    <DashboardOptionsStudent />
                    <NotificationAndResults />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
