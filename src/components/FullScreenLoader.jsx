import Loader from "./Loader"

const FullScreenLoader = ({ suspense }) => {
    return (
        <div
            className={`flex justify-center items-center z-50 inset-0 h-screen ${
                suspense
                    ? "bg-bg-light dark:bg-bg-dark"
                    : "bg-bg-light/70 dark:bg-bg-dark/70"
            } fixed`}
        >
            <Loader />
        </div>
    )
}

export default FullScreenLoader
