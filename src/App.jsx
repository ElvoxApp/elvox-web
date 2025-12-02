import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FullScreenLoader from "./components/FullScreenLoader"
import useBlockImageAndLinkActions from "./hooks/useBlockImageAndLinkActions"
import ProtectedRoute from "./pages/ProtectedRoute"
import { useThemeStore } from "./stores"
import { Toaster } from "react-hot-toast"
import CandidateApplication from "./pages/CandidateApplication"
import ForgotPassword from "./pages/ForgotPassword"

const SignUp = lazy(() => import("./pages/SignUp"))
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

const ThemeToggle = ({ children }) => {
    const { theme } = useThemeStore()
    useEffect(() => {
        const root = window.document.documentElement
        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [theme])

    return children
}

const App = () => {
    useBlockImageAndLinkActions() // Prevent image drag and link right-click

    return (
        <BrowserRouter>
            <ThemeToggle>
                <Toaster
                    position='top-center'
                    toastOptions={{
                        className:
                            "text-center !bg-card-light dark:!bg-card-dark !text-primary-light dark:!text-primary-dark !shadow-xl !border !border-black/10 dark:!border-white/10",
                        duration: 3000,
                        removeDelay: 1000,
                        success: {
                            duration: 2000
                        }
                    }}
                />
                <Suspense fallback={<FullScreenLoader suspense />}>
                    <Routes>
                        <Route
                            path='/login'
                            element={<Login />}
                        />
                        <Route
                            path='/signup'
                            element={<SignUp />}
                        />
                        <Route
                            path='/forgot-password'
                            element={<ForgotPassword />}
                        />
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path='/'
                                element={<Dashboard />}
                            />
                            <Route
                                path='/candidate-application'
                                element={<CandidateApplication />}
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </ThemeToggle>
        </BrowserRouter>
    )
}

export default App
