import axios from "axios"
import { useState } from "react"
import { MdDelete } from "react-icons/md"
import Button from "./Button"
import { useAuthStore } from "../stores"
import SignatureInput from "./SignatureInput"

const API_URL = import.meta.env.VITE_API_URL

const Nominee = ({
    number,
    setIsLoading,
    setNomineeData,
    setNomineeSignature,
    otherNomineeAdmNo
}) => {
    const [admno, setAdmno] = useState(null)
    const [nomineeInfo, setNomineeInfo] = useState(null)
    const { user } = useAuthStore()

    /* MUST CHANGE FOR PROD USING ACTUAL API AND DB, CHECK CLASS AND EXISTING NOMINEE */
    const fetchData = async () => {
        if (!admno) return
        if (admno === otherNomineeAdmNo) {
            // MUST IMPLEMENT TOAST NOTIFICATION, MSG: "Nominees cannot be the same person"
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.get(`${API_URL}/users/${admno}`)
            if (
                res.data.dept !== user.dept ||
                res.data.class !== user.class ||
                res.data.sem !== user.sem ||
                res.data.batch !== user.batch
            ) {
                // MUST IMPLEMENT TOAST NOTIFICATION, MSG: "Nominee must be of same class and batch"
                return
            }
            setNomineeData(res.data)
            setNomineeInfo(res.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setIsLoading(false)
        }
    }
    /* ---------------------------------------------- */

    const deleteNominee = () => {
        setNomineeInfo(null)
        setNomineeData(null)
        setNomineeSignature(null)
    }

    return (
        <div className='flex flex-col gap-2'>
            {!nomineeInfo && (
                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor={`admno${number}`}
                        className='text-secondary-light dark:text-secondary-dark'
                    >
                        Enter admission number:
                    </label>
                    <div className='flex w-full gap-2'>
                        <input
                            type='number'
                            id={`admno${number}`}
                            className='outline-none border-none bg-field-light dark:bg-field-dark rounded-md w-full h-11 p-3 text-primary-light dark:text-primary-dark placeholder:text-secondary-light dark:placeholder:text-secondary-dark active:bg-field-light dark:active:bg-field-dark  appearance-none'
                            placeholder='Enter admission number'
                            onChange={(e) => setAdmno(e.target.value)}
                            onWheel={(e) => e.target.blur()}
                        />
                        <Button
                            className='bg-accent hover:bg-button-hover text-xs py-2 px-4'
                            onClick={fetchData}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            )}
            {nomineeInfo && (
                <div className='flex flex-col gap-3'>
                    <div className='flex max-sm:flex-col w-full gap-3'>
                        <div className='flex flex-col flex-1 gap-2'>
                            <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                                Name
                            </p>

                            <p className='text-sm text-primary-light dark:text-primary-dark bg-field-light dark:bg-field-dark rounded-md w-full p-2'>
                                {nomineeInfo.name}
                            </p>
                        </div>
                        <div className='flex flex-col flex-1 sm:flex-[1.2] gap-2'>
                            <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                                Phone
                            </p>
                            <div className='flex gap-2'>
                                <p className='text-sm text-primary-light dark:text-primary-dark bg-field-light dark:bg-field-dark rounded-md w-full p-2'>
                                    +91 {nomineeInfo.phone}
                                </p>
                                <Button
                                    className='bg-secondary-button hover:bg-secondary-button-hover px-3 max-sm:hidden'
                                    onClick={deleteNominee}
                                >
                                    <MdDelete className='size-4' />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                            Signature
                        </p>
                        <SignatureInput
                            setSignature={setNomineeSignature}
                            signFor={`nominee${number}`}
                        />
                    </div>
                    <div className='flex justify-center items-center w-full sm:hidden'>
                        <Button
                            className='bg-secondary-button hover:bg-secondary-button-hover w-full flex justify-center items-center p-3'
                            onClick={deleteNominee}
                        >
                            <MdDelete className='size-5' />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Nominee
