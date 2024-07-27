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
import AddBlog from "../Pages/AddBlog";
import BlogsLists from "../Pages/BlogsLists";
import Cities from "../Pages/City";
import Testimonials from "../Pages/Testimonials";


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
                path:'cities',
                element:<Cities />
            },
            {
                path:'addBlog',
                element:<AddBlog />
            },
            {
                path:'blogs',
                element:<BlogsLists />
            },
            {
                path:'blogCategories',
                element:<BlogCategories />
            },
            {
                path:'testimonials',
                element:<Testimonials />
            },
        ]
    }
])