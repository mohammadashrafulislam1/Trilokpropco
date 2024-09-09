import { FaSearch } from "react-icons/fa";

const Filter = () => {
    return (
    <div>
          <div>
            <label htmlFor="city">Location</label>
            <input type="text" name="city" id="city" placeholder="City Location" className="input w-1/2 border"/>
            </div>  
            <div className="flex items-center justify-center">
            <div>
            <label htmlFor="city">Type</label>
            <input type="text" name="city" id="city" placeholder="City Location" className="input border solid black"/>
            </div> 

            <div>
            <label htmlFor="city">For</label>
            <input type="text" name="city" id="city" placeholder="City Location" className="input border"/>
            </div> 

            <div>
            <label htmlFor="city">Min Price</label>
            <input type="text" name="city" id="city" placeholder="City Location" className="input border"/>
            </div> 

            <div>
            <label htmlFor="city">Max Price</label>
            <input type="text" name="city" id="city" placeholder="City Location" className="input border"/>
            </div> 
            <button className="btn"><FaSearch /></button>
            </div>
    </div>
    );
};

export default Filter;