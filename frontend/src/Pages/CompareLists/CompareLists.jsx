import { useEffect, useState } from "react";
import Header from "../../Component/Navigation/Header";
import CompareItems from "../../Component/CompareDrawer/CompareItems";

const CompareLists = () => {
   const [compareLists, setCompareLists] = useState();

   useEffect(()=>{
    // Get counts from localStorage on component load
    const compareList = JSON.parse(localStorage?.getItem("compareList")) || [];
    setCompareLists(compareList)
   },[])
    
    return (
    <div>
    <Header />
    {
        compareLists?.map((item, index) => 
            <CompareItems key={index} list={item}/>
        )
    }        
    </div>
    );
};

export default CompareLists;