import React, { useEffect, useRef } from "react"
import Title from "./Title"
import Button from "./Button"

const VerifyVoterEnterAdmNo = ({ admno, setAdmno, error, fetchData }) => {
    const inpRef = useRef(null)

    useEffect(() => {
        if (!inpRef.current) return

        inpRef.current.focus()
    }, [])

    return (
        <div className='flex flex-col w-full gap-8 max-sm:px-6 max-sm:py-4'>
            <Title
                title='Enter Admission Number'
                className='text-2xl '
            />
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor='admno'
                        className='text-primary-light dark:text-primary-dark'
                    >
                        Admission Number
                    </label>
                    <input
                        type='text'
                        id='admno'
                        value={admno}
                        className='outline-none border-none bg-field-light
                dark:bg-field-dark rounded-md w-full h-11 p-3 text-primary-light
                dark:text-primary-dark placeholder:text-secondary-light
                dark:placeholder:text-secondary-dark active:bg-field-light
                dark:active:bg-field-dark appearance-none'
                        placeholder='Enter admission number'
                        autoComplete='off'
                        spellCheck={false}
                        autoCorrect='off'
                        autoCapitalize='off'
                        ref={inpRef}
                        onChange={(e) => setAdmno(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") fetchData()
                        }}
                    />
                    {error && (
                        <p className='text-xs text-red-500 mt-1 font-medium'>
                            {error}
                        </p>
                    )}
                </div>
                <Button
                    text='Submit'
                    className='w-full h-11 text-sm bg-accent hover:bg-button-hover'
                    type='button'
                    onClick={fetchData}
                />
            </div>
        </div>
    )
}

export default VerifyVoterEnterAdmNo
