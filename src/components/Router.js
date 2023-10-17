import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import ProductDetails from '../pages/ProductDetails'

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
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/product/:id",
                    element: <ProductDetails />
                },
                {
                    path: "/product",
                    element: <ProductDetails />
                },
                {
                    path: "/create-account",
                    element: <CreateAccount />
                },
            ]
        }
    ])
    return (
        <RouterProvider router={BrowserRoutes} />
    )

}