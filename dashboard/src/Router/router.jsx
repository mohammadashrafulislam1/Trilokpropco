import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Component/Dashboard";
import AddProperty from "../Pages/AddProperty";
import Root from "../Pages/Root";


export const router = createBrowserRouter([

    {
        path:"/",
        element: <Dashboard/>,
        errorElement:<h1>Error</h1>,
        children:[
            {
                path:'/',
                element:<Root />
            },
            {
                path:'add',
                element:<AddProperty />
            }
        ]
    }
])