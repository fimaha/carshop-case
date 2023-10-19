import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Cars from '../pages/Cars'
import Login from '../pages/Login'
import Company from '../pages/Company'
import CreateAccount from '../pages/CreateAccount'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'


export default function Router() {
    const Layout = () => {
        return (
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
        )
    }

    const BrowserRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/carmodels",
                    element: <Cars />
                },
                {
                    path: "/employees",
                    element: <Company />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/create-account",
                    element: <CreateAccount />
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/*",
                    element: <Home />
                },
            ]
        }
    ])
    return (
        <RouterProvider router={BrowserRoutes} />
    )

}