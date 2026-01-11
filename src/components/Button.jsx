import React from "react"

const Button = ({
    type = "button",
    text,
    className,
    onClick,
    children,
    disabled = false,
    animation = true
}) => {
    className = disabled
        ? className.replace(/\bhover:[^\s]+|focus:[^\s]+|active:[^\s]+/g, "")
        : className

    return (
        <button
            type={type}
            className={`text-primary-dark rounded-md ${className} ${
                disabled
                    ? "opacity-50 cursor-not-allowed"
                    : animation
                    ? "cursor-pointer active:scale-90 transition-all duration-200"
                    : "cursor-pointer"
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {text} {children}
        </button>
    )
}

export default Button
