import { Dialog, DialogPanel } from "@headlessui/react"
import { useEffect } from "react"
import { IoMdClose } from "react-icons/io"

const Modal = ({ open, onClose, children }) => {
    useEffect(() => {
        if (open) {
            window.history.pushState({ modal: true }, "")
        }

        const handler = () => {
            if (open) onClose()
        }

        window.addEventListener("popstate", handler)
        return () => window.removeEventListener("popstate", handler)
    }, [open, onClose])

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                        <h2 className='text-lg  text-center'>
                            Candidate Application
                        </h2>
                    </div>
                    <IoMdClose
                        className='absolute -right-1.5 -top-2.5 text-2xl cursor-pointer active:scale-50 transition-all duration-300'
                        onClick={onClose}
                    />
                </div>
                {children}
            </DialogPanel>
        </Dialog>
    )
}

export default Modal
