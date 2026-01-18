import { Dialog, DialogPanel } from "@headlessui/react"
import { IoMdClose } from "react-icons/io"
import { useModalStore } from "../stores"
import { useEffect, useRef } from "react"

const Modal = ({ open, onClose, title, children }) => {
    const { openModal, removeModal } = useModalStore()
    const modalIdRef = useRef(title)
    const onCloseRef = useRef(onClose)

    // Keep onClose ref updated without triggering re-registration
    useEffect(() => {
        onCloseRef.current = onClose
    })

    useEffect(() => {
        if (!open) return

        const modalId = modalIdRef.current

        // Register modal in stack with close handler
        openModal(modalId, () => {
            onCloseRef.current()
        })

        // Remove from stack when modal unmounts
        return () => {
            removeModal(modalId)
        }
    }, [open, openModal, removeModal])

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose()
            }}
            className='fixed inset-0 z-40 flex sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm flex-1'
        >
            <DialogPanel
                className='
          dark:bg-card-dark bg-card-light 
          dark:text-primary-dark text-primary-light 
          relative shadow-xl w-full max-w-[49rem] p-6 rounded-lg
          max-h-[95vh] min-h-0 flex flex-1 flex-col overflow-hidden
        '
            >
                <div className='shrink-0 relative'>
                    <div className='border-b border-gray-500 w-full p-2'>
                        <h2 className='text-lg text-center dark:text-primary-dark text-primary-light'>
                            {title}
                        </h2>
                    </div>
                    <IoMdClose
                        className='absolute -right-1.5 -top-2.5 text-2xl cursor-pointer active:scale-50 transition-all duration-300'
                        onClick={() => {
                            onClose()
                        }}
                    />
                </div>
                {children}
            </DialogPanel>
        </Dialog>
    )
}

export default Modal
