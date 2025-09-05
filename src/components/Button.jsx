import React from "react"

const Button = ({ type, text, className, onClick }) => {
    return (
        <button
            type={type}
            className={`bg-accent text-primary rounded-md cursor-pointer ${className} hover:bg-button-hover transition-all duration-200 active:scale-95`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
