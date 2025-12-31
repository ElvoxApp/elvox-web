const AppealDetailsDescription = ({ description }) => {
    return (
        <div className='flex flex-col gap-1'>
            <p className='font-semibold col-span-2 mb-2'>Appeal Description</p>
            <p className='text-sm text-primary-light dark:text-primary-dark py-1.5 text-justify'>
                {description}
            </p>
        </div>
    )
}

export default AppealDetailsDescription
