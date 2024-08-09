import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Home/Main/Main";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        errorElement:<div>ERROR</div>,
        children:[
            {
                path:'/',
                element: <Main/>,
            }
        ]
    }
])