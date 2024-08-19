import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Home/Main/Main";
import ResultsPage from "../Pages/SearchResultPage/ResultsPage";
import CompareLists from "../Pages/CompareLists/CompareLists";
import FavLists from "../Pages/FavLists/FavLists";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        errorElement:<div>ERROR</div>,
        children:[
            {
                path:'/',
                element: <Main/>,
            },
            
        ]
    },
    {
        path:'/results',
        element:<ResultsPage />
    }, 
    {
        path:'/compare',
        element: <CompareLists/>,
    }, 
    {
        path:'/favourite',
        element: <FavLists/>,
    },
])