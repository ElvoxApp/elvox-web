const ProfileItem = ({ label, value, isLast }) => {
    return (
        <div className='contents'>
            <p
                className={`text-xs text-secondary-light dark:text-secondary-dark py-1.5 ${
                    !isLast && "border-b border-b-gray-400/40"
                }`}
            >
                {label}
            </p>
            <p
                className={`text-sm text-primary-light dark:text-primary-dark py-1.5 text-right ${
                    !isLast && "border-b border-b-gray-400/40"
                }`}
            >
                {value}
            </p>
        </div>
    )
}

export default ProfileItem
