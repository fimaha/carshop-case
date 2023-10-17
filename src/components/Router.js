import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export default function Router() {
    // const Layout = () => {
    //     return (
    //         <>
    //             <Header />
    //             <Outlet />
    //             <Footer />
    //         </>
    //     )
    // }

    // const BrowserRoutes = () => {
    //     return (
    //         <BrowserRouter>
    //             <Routes>
    //                 <Route path="/" element={<Layout />}>
    //                     <Route path="/" element={<Home />} />
    //                     <Route path="contact-us" element={<Contact />} />
    //                     <Route path="log-in" element={<Login />} />
    //                 </Route>
    //             </Routes>
    //         </BrowserRouter>
    //     )
    // }

    const BrowserRoutes = createBrowserRouter([
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

    ])
    return (
        // <BrowserRoutes />
        <RouterProvider router={BrowserRoutes} />
    )

}