import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
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
                    path: "/contact-us",
                    element: <Contact />
                },
                {
                    path: "/log-in",
                    element: <Login />
                },
            ]
        }
    ])
    return (
        <RouterProvider router={BrowserRoutes} />
    )

}