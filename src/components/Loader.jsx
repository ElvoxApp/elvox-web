import logo from "/images/logo-no-text.png"
const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-transparent'>
            <img
                src={logo}
                alt='logo'
                width={80}
                className='rotate-center'
            />
        </div>
    )
}

export default Loader
