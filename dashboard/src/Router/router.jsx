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
import Partners from "../Pages/Partners";
import Footer from "../Pages/Footer";
import Inquiries from "../Pages/Inquiries";
import About from "../Pages/About";
import WhyUs from "../Pages/WhyUs";
import Services from "../Pages/Services";


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
                path:'about',
                element:<About />
            },
            
            {
                path:'why',
                element:<WhyUs />
            },
            
            {
                path:'services',
                element:<Services />
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
            {
                path:'partners',
                element:<Partners />
            },
            {
                path:'inquiries',
                element:<Inquiries />
            },
            {
                path:'footer',
                element:<Footer />
            },
        ]
    }
])