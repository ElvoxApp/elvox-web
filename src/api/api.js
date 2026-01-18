import axios from "axios"
import toast from "react-hot-toast"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 30000
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Timeout
        if (error.code === "ECONNABORTED") {
            toast.error("Request timed out. Please try again.", {
                id: "timeout-error"
            })
            return
        }

        // Network error (offline)
        if (!error.response && !navigator.onLine) {
            toast.error("No internet connection", { id: "no-internet-error" })

            return
        }

        return Promise.reject(error)
    }
)

export default api
