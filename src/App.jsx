import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FullScreenLoader from "./components/FullScreenLoader"
import useBlockImageAndLinkActions from "./hooks/useBlockImageAndLinkActions"
import ProtectedRoute from "./pages/ProtectedRoute"
import { useThemeStore } from "./stores"

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
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path='/'
                                element={<Dashboard />}
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </ThemeToggle>
        </BrowserRouter>
    )
}

export default App
