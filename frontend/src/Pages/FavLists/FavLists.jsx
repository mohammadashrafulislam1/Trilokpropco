import { useEffect, useState } from "react";
import Header from "../../Component/Navigation/Header";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

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
      <div
      className="pt-5"
      style={{
        backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '400px', 
      }}
    >
      <Header />    
      <Helmet>
                <meta charSet="utf-8" />
                <title>Favourites List - Trilokpropco</title>
      </Helmet>
      <SectionTitle value="Favourites List" color="white" />
      </div>

      {/* card */}
      {
        favLists?.map((favlist, index) =>
         <PropertyListCard key={index} property={favlist}></PropertyListCard>
        )
      }
    </div>
    );
};

export default FavLists;