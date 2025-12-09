import { useState } from "react"
import { MdDelete } from "react-icons/md"
import Button from "./Button"
import { useAuthStore } from "../stores"
import SignatureInput from "./SignatureInput"
import toast from "react-hot-toast"
import api from "../api/api"

const Nominee = ({
    number,
    setIsLoading,
    setNomineeData,
    setNomineeSignature,
    otherNomineeAdmNo
}) => {
    const [admno, setAdmno] = useState("")
    const [nomineeInfo, setNomineeInfo] = useState(null)
    const { user } = useAuthStore()

    const fetchData = async () => {
        if (!admno) return
        if (admno === otherNomineeAdmNo) {
            toast.error("Nominees cannot be the same person")
            setAdmno("")
            return
        }

        if (admno === user.id) {
            toast.error("You cannot select yourself as a nominee")
            setAdmno("")
            return
        }

        try {
            setIsLoading(true)
            const res = await api.get(`/student/${admno}`)
            if (
                res.data.dept !== user.dept ||
                res.data.class !== user.class ||
                res.data.sem !== user.sem ||
                res.data.batch !== user.batch
            ) {
                toast.error("Nominee must be from the same class")
                setAdmno("")
                return
            }
            setNomineeData(res.data)
            setNomineeInfo(res.data)
        } catch (err) {
            toast.error(err.response.data.error)
            setAdmno("")
        } finally {
            setIsLoading(false)
        }
    }

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
                            value={admno}
                            onWheel={(e) => e.target.blur()}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") fetchData()
                            }}
                        />
                        <Button
                            className='bg-accent hover:bg-button-hover text-xs py-2 px-4'
                            onClick={fetchData}
                            disabled={!admno}
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
