import Loader from "./Loader"

const FullScreenLoader = ({ suspense }) => {
    return (
        <div
            className={`flex justify-center items-center z-50 inset-0 ${
                suspense ? "bg-bg-dark" : "bg-bg-dark/70"
            } fixed`}
        >
            <Loader />
        </div>
    )
}

export default FullScreenLoader
