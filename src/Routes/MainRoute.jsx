import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Fashion from "../Pages/Fashion/Fashion";
import Register from "../Pages/Register/Register.jsx"
import Login from "../Pages/Login/Login.jsx";
import Carts from "../Pages/Cart/Carts.jsx";
import Beauty from "../Pages/Beauty/Beauty.jsx";
import Electronics from "../Pages/Electronics/Electronics.jsx";
import ErrorPage from "../Pages/Error/ErrorPage.jsx";



const routes = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:"/",
                element:<Home/>,
                children:[
                    {
                        path:"/fashion",
                        element:<Fashion/>
                    },
                    {
                        path:"/beauty",
                        element:<Beauty/>
                    },
                    {
                        path:"/electronics",
                        element:<Electronics/>
                    }
                ]
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/cart",
                element:<Carts/>
            }

        ]
    }
])

export default routes