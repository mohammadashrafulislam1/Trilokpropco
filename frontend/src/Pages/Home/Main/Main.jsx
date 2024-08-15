
import ExploreCities from "../Home/ExploreCities";
import Home from "../Home/Home";
import Partners from "../Home/Partners";
import PropertyTypes from "../Home/PropertyTypes";
import SearchBar from "../Home/SearchBar";

const Main = () => {
    return (
        <div className="overflow-hidden">
            <Home />
            <SearchBar />
            <Partners />
            <ExploreCities />
            <PropertyTypes />
        </div>
    );
};

export default Main;