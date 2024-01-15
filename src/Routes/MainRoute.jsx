import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Fashion from "../Pages/Fashion/Fashion";
import Register from "../Pages/Register/Register.jsx"
import Login from "../Pages/Login/Login.jsx";
import Carts from "../Pages/Cart/Carts.jsx";



const routes = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>,
                children:[
                    {
                        path:"/fashion",
                        element:<Fashion/>
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