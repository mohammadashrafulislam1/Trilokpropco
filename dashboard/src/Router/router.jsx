import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Component/Dashboard";
import AddProperty from "../Pages/AddProperty";
import Root from "../Pages/Root";
import Properties from "../Pages/Properties";
import Developer from "../Pages/Developer";
import Type from "../Pages/Type";
import Status from "../Pages/Status";
import Amenities from "../Pages/Amenities";
import BlogCategories from "../Pages/BlogCategories";


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
            },
            {
                path:'properties',
                element:<Properties />
            },
            {
                path:'developer',
                element:<Developer />
            },
            {
                path:'type',
                element:<Type />
            },
            {
                path:'status',
                element:<Status />
            },
            {
                path:'amenities',
                element:<Amenities />
            },
            {
                path:'addBlog',
                element:<Status />
            },
            {
                path:'blogs',
                element:<Status />
            },
            {
                path:'blogCategories',
                element:<BlogCategories />
            },
        ]
    }
])