import { useAuthStore, useElectionStore } from "../stores"

const AppealAdminNote = ({
    note,
    noteValue,
    setNoteValue,
    error,
    electionId
}) => {
    const {
        user: { role }
    } = useAuthStore()
    const { election } = useElectionStore()

    return (
        <div className='flex flex-col gap-1'>
            {note && (
                <>
                    <p className='font-semibold col-span-2 mb-2'>Admin Note</p>
                    <p className='text-sm text-primary-light dark:text-primary-dark py-1.5 text-justify'>
                        {note}
                    </p>
                </>
            )}
            {!note && role === "admin" && election?.id === electionId && (
                <>
                    <p className='font-semibold col-span-2 mb-2'>Admin Note</p>
                    <div className='space-y-1'>
                        <textarea
                            id='admin-note'
                            value={noteValue}
                            onChange={(e) => setNoteValue(e.target.value)}
                            rows={4}
                            className='outline-none border-none bg-field-light dark:bg-field-dark
             rounded-md w-full px-3 py-2
             text-primary-light dark:text-primary-dark
             placeholder:text-secondary-light dark:placeholder:text-secondary-dark
             resize-none custom-scrollbar'
                            placeholder='Write your response to the appeal here…'
                            maxLength={1000}
                        />
                        {noteValue?.length === 0 && error && (
                            <p className='text-xs text-red-500 mt-1 font-medium'>
                                {error}
                            </p>
                        )}
                        <div className='flex relative pb-1'>
                            {noteValue?.length > 0 && (
                                <p className='absolute right-0 text-xs text-secondary-light dark:text-secondary-dark'>
                                    {noteValue.length}/1000
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AppealAdminNote
