import React from "react"

const ProfileSection = ({ children, title }) => {
    return (
        <div className='grid grid-cols-2 gap-y-2'>
            <p className='font-semibold col-span-2'>{title} Information</p>
            {children}
        </div>
    )
}

export default ProfileSection
