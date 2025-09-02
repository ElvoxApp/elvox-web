import React from "react"

const Button = ({ text, className, onClick }) => {
    return (
        <button
            className={`bg-accent text-primary rounded-md ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
