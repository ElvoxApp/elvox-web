import React from "react"

const ProfileSection = ({ children, title }) => {
    return (
        <div className='contents'>
            <p className='font-semibold col-span-2'>{title} Information</p>
            {children}
        </div>
    )
}

export default ProfileSection
