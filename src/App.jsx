import { lazy, Suspense, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import FullScreenLoader from "./components/FullScreenLoader"
import useBlockImageAndLinkActions from "./hooks/useBlockImageAndLinkActions"
import { useThemeStore, useAuthStore } from "./stores"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./pages/ProtectedRoute"

const SignUp = lazy(() => import("./pages/SignUp"))
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const CandidateApplication = lazy(() => import("./pages/CandidateApplication"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const Unauthorized = lazy(() => import("./pages/Unauthorized"))
const ViewCandidates = lazy(() => import("./pages/ViewCandidates"))
const Profile = lazy(() => import("./pages/Profile"))
const Notifications = lazy(() => import("./pages/Notifications"))
const Appeals = lazy(() => import("./pages/Appeals"))
const AppealDetails = lazy(() => import("./pages/AppealDetails"))
const Results = lazy(() => import("./pages/Results"))

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

const routes = [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/unauthorized", element: <Unauthorized /> },
    {
        element: <ProtectedRoute />,
        children: [
            { path: "/", element: <Dashboard /> },
            {
                path: "/candidate-application",
                element: <CandidateApplication />,
                handle: { allowed: ["student"] }
            },
            {
                path: "/candidates",
                element: <ViewCandidates />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/notifications",
                element: <Notifications />
            },
            {
                path: "/appeals",
                element: <Appeals />
            },
            {
                path: "/appeals/:id",
                element: <AppealDetails />
            },
            {
                path: "/results",
                element: <Results />
            }
        ]
    }
]

const router = createBrowserRouter(routes)

const App = () => {
    const { fetchMe } = useAuthStore()

    useBlockImageAndLinkActions() // Prevent image drag and link right-click

    useEffect(() => {
        fetchMe()
    }, [fetchMe])

    return (
        <ThemeToggle>
            <Suspense fallback={<FullScreenLoader suspense />}>
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
                <RouterProvider router={router} />
            </Suspense>
        </ThemeToggle>
    )
}

export default App
