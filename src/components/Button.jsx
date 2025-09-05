import React from "react"

const Button = ({ text, className, onClick }) => {
    return (
        <button
            className={`bg-accent text-primary rounded-md cursor-pointer ${className} hover:bg-button-hover transition-all duration-200 active:scale-95`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
