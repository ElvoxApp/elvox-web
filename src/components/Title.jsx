import React from "react"

const Title = ({ title, className }) => {
    return <h2 className={`text-primary font-bold ${className}`}>{title}</h2>
}

export default Title
