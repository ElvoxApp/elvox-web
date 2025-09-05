import { useEffect } from "react"

const useBlockImageAndLinkActions = () => {
    useEffect(() => {
        const handleContextMenu = (e) => {
            if (e.target.tagName === "IMG" || e.target.tagName === "A") {
                e.preventDefault()
            }
        }

        const handleDragStart = (e) => {
            if (e.target.tagName === "IMG" || e.target.tagName === "A") {
                e.preventDefault()
            }
        }
        document.addEventListener("contextmenu", handleContextMenu)
        document.addEventListener("dragstart", handleDragStart)

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
            document.removeEventListener("dragstart", handleDragStart)
        }
    }, [])
}

export default useBlockImageAndLinkActions
