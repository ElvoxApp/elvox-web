import React from "react"

const Title = ({ title, className }) => {
    return (
        <h2
            className={`text-primary-light dark:text-primary-dark text-center font-bold ${className}`}
        >
            {title}
        </h2>
    )
}

export default Title
