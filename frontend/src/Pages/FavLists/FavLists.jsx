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
    <div className="bg-[#e0e0e05d] h-full">
      <div
      className="pt-5 lg:h-96 h-40 md:h-56"
      style={{
        backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-4 lg:mt-24 lg:mx-6 lg:pb-20 pb-12 mx-4 mt-10 gap-6">
      {
        favLists?.map((favlist, index) =>
         <PropertyListCard key={index} property={favlist}></PropertyListCard>
        )
      }
      </div>
    </div>
    );
};

export default FavLists;