import { useState } from "react"
import logo from "/images/logo.png"

const Logo = ({ width, height, className }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <img
            src={logo}
            alt='logo'
            width={width}
            height={height}
            className={className}
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? "block" : "none" }}
        />
    )
}

export default Logo
