import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FullScreenLoader from "./components/FullScreenLoader"
import useBlockImageAndLinkActions from "./hooks/useBlockImageAndLinkActions"

const SignUp = lazy(() => import("./pages/SignUp"))
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

const App = () => {
    useBlockImageAndLinkActions()

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
