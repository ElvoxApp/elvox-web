import React from "react"

const Button = ({
    type = "button",
    text,
    className,
    onClick,
    disabled,
    children
}) => {
    className = disabled
        ? className.replace(/\bhover:[^\s]+|focus:[^\s]+|active:[^\s]+/g, "")
        : className

    return (
        <button
            type={type}
            className={`text-primary rounded-md ${className} ${
                disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer active:scale-95 transition-all duration-200"
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {text} {children}
        </button>
    )
}

export default Button
