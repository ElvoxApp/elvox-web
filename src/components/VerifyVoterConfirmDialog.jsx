import { Checkbox, Dialog, DialogPanel, Field, Label } from "@headlessui/react"
import { HiCheck } from "react-icons/hi"
import Button from "./Button"

const VerifyVoterConfirmDialog = ({
    isOpen,
    setIsOpen,
    verifyVoter,
    skipConfirm,
    setSkipConfirm
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
        >
            <DialogPanel
                className='
          dark:bg-card-dark bg-card-light 
          dark:text-primary-dark text-primary-light 
          relative shadow-xl w-full max-w-md p-6 rounded-lg
          max-h-[90vh] min-h-0 flex flex-col overflow-hidden
        '
            >
                <div className='border-b border-gray-500 w-full pb-2 pt-1'>
                    <h2 className='text-lg text-center'>
                        Confirm Verification
                    </h2>
                </div>
                <div className='text-center text-base px-3 py-4'>
                    <p>
                        Verify this voter and generate a voting OTP?
                        <br />
                        This action cannot be undone
                    </p>
                </div>
                <Field className='flex items-center text-sm text-secondary-light dark:text-secondary-dark gap-2 py-2'>
                    <Checkbox
                        checked={skipConfirm}
                        onChange={setSkipConfirm}
                        className='group block cursor-pointer size-4 rounded border border-accent bg-field-light dark:bg-field-dark data-checked:bg-accent'
                    >
                        <HiCheck className='hidden size-4 fill-white group-data-checked:block' />
                    </Checkbox>
                    <Label className='cursor-pointer select-none'>
                        Don’t show this again
                    </Label>
                </Field>
                <div className='flex justify-center gap-3 w-full'>
                    <Button
                        text='Cancel'
                        className='w-1/2 h-11 text-sm bg-secondary-button hover:bg-secondary-button-hover-light dark:hover:bg-secondary-button-hover'
                        type='button'
                        onClick={() => setIsOpen(false)}
                    />
                    <Button
                        text='Verify & Generate OTP'
                        className='w-1/2 h-11 text-sm bg-accent hover:bg-button-hover'
                        type='button'
                        onClick={verifyVoter}
                    />
                </div>
            </DialogPanel>
        </Dialog>
    )
}

export default VerifyVoterConfirmDialog
