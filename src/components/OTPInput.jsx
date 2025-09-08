import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

const OTPInput = () => {
    const [otp, setOtp] = useState(Array(6).fill(""))
    const inputsRef = useRef([])

    const {
        register,
        setValue,
        formState: { errors }
    } = useFormContext()

    const handleChange = (e, i) => {
        const val = e.target.value.replace(/[^0-9]/g, "")
        const newOtp = [...otp]
        newOtp[i] = val
        setOtp(newOtp)

        if (val && i < 5) {
            inputsRef.current[i + 1].focus()
        }
    }

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) {
            inputsRef.current[i - 1].focus()
        }
    }

    const handlePaste = (e, i) => {
        e.preventDefault()
        if (i === 0) {
            const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "")
            if (paste.length === 6) {
                setOtp(paste.split(""))
                inputsRef.current[5].focus()
            }
        }
    }

    useEffect(() => {
        const finalOtp = otp.join("")
        setValue("otp", finalOtp)
    }, [otp, setValue])

    return (
        <div className='flex justify-center items-center gap-2 w-full'>
            {Array.from({ length: 6 }).map((_, i) => (
                <input
                    key={i}
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={(e) => handlePaste(e, i)}
                    ref={(el) => (inputsRef.current[i] = el)}
                    className={`outline-none border-secondary border-2 bg-field rounded-md w-1/6 h-11 p-3 text-xl text-primary text-center active:bg-field ${
                        !errors?.["id"]
                            ? "focus:border-accent focus:ring-2 focus:ring-accent"
                            : ""
                    } ${errors?.otp ? "ring-2 ring-red-400" : ""}`}
                />
            ))}

            {/*Hidden input to store the combined OTP in RHF*/}
            <input
                type='hidden'
                {...register("otp")}
            />
        </div>
    )
}

export default OTPInput
