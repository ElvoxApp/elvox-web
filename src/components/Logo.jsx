import React from "react"
import logo from "/images/logo.png"

const Logo = ({ width, height, className }) => {
    return (
        <img
            src={logo}
            alt='logo'
            width={width}
            height={height}
            className={className}
        />
    )
}

export default Logo
