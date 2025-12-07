import { Dialog, DialogPanel } from "@headlessui/react"
import { useEffect, useRef, useCallback } from "react"
import { IoMdClose } from "react-icons/io"

const Modal = ({ open, onClose, children }) => {
    const hasPushedRef = useRef(false)

    useEffect(() => {
        if (!open) {
            hasPushedRef.current = false
            return
        }

        if (!hasPushedRef.current) {
            window.history.pushState({ modal: true }, "")
            hasPushedRef.current = true
        }

        const handler = (event) => {
            if (event.state?.modal) {
                onClose()
            }
        }

        window.addEventListener("popstate", handler)
        return () => window.removeEventListener("popstate", handler)
    }, [open, onClose])

    const handleRequestClose = useCallback(() => {
        if (hasPushedRef.current && window.history.state?.modal) {
            window.history.back()
        } else {
            onClose()
        }
    }, [onClose])

    return (
        <Dialog
            open={open}
            onClose={handleRequestClose}
            className='fixed inset-0 z-40 flex sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
        >
            <DialogPanel
                className='
          dark:bg-card-dark bg-card-light 
          dark:text-primary-dark text-primary-light 
          relative shadow-xl w-full max-w-2xl p-6 rounded-lg
          max-h-[95vh] min-h-0 flex flex-col overflow-hidden
        '
            >
                <div className='shrink-0 relative'>
                    <div className='border-b border-gray-500 w-full p-2'>
                        <h2 className='text-lg text-center'>
                            Candidate Application
                        </h2>
                    </div>
                    <IoMdClose
                        className='absolute -right-1.5 -top-2.5 text-2xl cursor-pointer active:scale-50 transition-all duration-300'
                        onClick={handleRequestClose}
                    />
                </div>
                {children}
            </DialogPanel>
        </Dialog>
    )
}

export default Modal
