import Button from "./Button"

const ManageElectionDeleteElection = ({ handleShowConfirmDialog }) => {
    return (
        <div className='flex flex-col w-full gap-4 px-4 py-4 rounded-md border border-red-400 bg-red-400/25 text-primary-light dark:text-primary-dark shadow-lg transition-all duration-100'>
            <div className='flex flex-col gap-2'>
                <p className='font-semibold text-base text-left text-primary-light dark:text-primary-dark'>
                    Danger Zone
                </p>
                <p className='text-left text-primary-light dark:text-primary-dark'>
                    This action is permanent and cannot be undone. All election
                    data will be permanently deleted
                </p>
            </div>
            <Button
                text='Delete Election'
                className='py-2 px-4 text-sm bg-red-700 hover:bg-red-800 self-end'
                onClick={() => handleShowConfirmDialog(true)}
            />
        </div>
    )
}

export default ManageElectionDeleteElection
