import { useState } from "react"
import { LuUpload } from "react-icons/lu"

const SignatureInput = ({ setSignature, signFor }) => {
    const [preview, setPreview] = useState(null)

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const imgUrl = URL.createObjectURL(file)
        setPreview(imgUrl)
        setSignature(file)
    }

    return (
        <div className='w-full'>
            <label
                htmlFor={`signature-${signFor}`}
                className={`flex justify-center items-center bg-field-light dark:bg-field-dark  h-32 rounded-md border-2 border-dashed border-gray-500 cursor-pointer dark:hover:bg-secondary-button-hover hover:bg-secondary-button-hover-light ${
                    preview ? "" : "p-2"
                }`}
            >
                {!preview && (
                    <div className='flex flex-col items-center gap-1'>
                        <LuUpload className='size-5' />
                        <p className='text-sm text-center'>
                            Click to upload
                            <br />
                            <span className='text-xs'>JPG,PNG only</span>
                        </p>
                    </div>
                )}
                {preview && (
                    <img
                        alt={`signature-${signFor}`}
                        src={preview}
                        className='w-full h-full rounded-md'
                    />
                )}
            </label>
            <input
                type='file'
                name={`signature-${signFor}`}
                id={`signature-${signFor}`}
                accept='.jpg,.jpeg,.png,image/jpeg,image/png'
                className='hidden'
                onChange={handleChange}
            />
        </div>
    )
}

export default SignatureInput
