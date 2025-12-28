import { useState } from "react"
import NoAppealsSubmitted from "../components/NoAppealsSubmitted"

const SubmitAppeal = () => {
    const [appeals, setAppeals] = useState([])

    return (
        <div className='flex flex-col px-2 md:px-5 lg:px-9 py-5 flex-1'>
            {appeals.length === 0 && <NoAppealsSubmitted />}
        </div>
    )
}

export default SubmitAppeal
