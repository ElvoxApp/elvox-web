import { lazy, Suspense /*useEffect*/ } from "react"
import { BrowserRouter, Routes, Route /*useLocation*/ } from "react-router-dom"
import FullScreenLoader from "./components/FullScreenLoader"
import useBlockImageAndLinkActions from "./hooks/useBlockImageAndLinkActions"

const SignUp = lazy(() => import("./pages/SignUp"))
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

const App = () => {
    //const location = useLocation()

    /* useEffect(() => {
        switch (location.pathname) {
            case "/login":
                document.title = "Login"
                break
            case "/signup":
                document.title = "Sign Up"
                break
            case "/":
                document.title = "Dashboard"
                break
        }
    }, [location.pathname])*/

    useBlockImageAndLinkActions() // Prevent image drag and link right-click

    return (
        <BrowserRouter>
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
                        path='/'
                        element={<Dashboard />}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
