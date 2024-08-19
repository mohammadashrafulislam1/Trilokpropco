import { useEffect, useState } from "react";
import Header from "../../Component/Navigation/Header";

const FavLists = () => {
    const [favLists, setFavLists] = useState([]);

    useEffect(() => {
        // Get the comparison list from localStorage on component load
        const compareList = JSON.parse(localStorage?.getItem("favList")) || [];
        setFavLists(compareList);
      }, []);

      console.log(favLists)
    return (
    <div>
      <Header />    
    </div>
    );
};

export default FavLists;