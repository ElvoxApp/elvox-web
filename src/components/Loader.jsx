import logo from "/images/logo-no-text.png"
const Loader = () => {
    return (
        <div className='flex justify-center items-center bg-transparent h-full w-full'>
            <img
                src={logo}
                alt='logo'
                width={50}
                className='rotate-center'
            />
        </div>
    )
}

export default Loader
