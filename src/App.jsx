import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

const App = () => {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}

export default App
