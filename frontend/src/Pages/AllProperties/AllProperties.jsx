import { Helmet } from 'react-helmet';
import Header from '../../Component/Navigation/Header';
import SectionTitle from '../../Component/ForAll/SectionTitle';
import { useEffect, useState } from 'react';
import { endPoint } from '../../Component/ForAll/ForAll';
import PropertyListCard from '../../Component/ForAll/PropertyListCard';
import Filter from '../../Component/Filter/Filter';

const AllProperties = () => {
    const [properties, setProperties]= useState();
    useEffect(()=>{
        const fetchProperties = async()=>{
            try {
                const response = await fetch(`${endPoint}/property`);
                const data = await response.json();

                // Sort by date and limit to the first 8 properties
                const sortedProperties = data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

                setProperties(sortedProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
        fetchProperties()
    },[])
    return (
        <div>
            <div style={{
                    backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }} className="pt-5 lg:h-96 h-40 md:h-56"><Header />
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Explore Properties Lists - Trilokpropco</title>
                </Helmet>
                <SectionTitle value="Explore Properties" color="white" /></div>
                <div>
                    <Filter />
                </div>
            <div className="flex items-center">
                <div>
                {
                properties?.map(property =>(<PropertyListCard key={property?._id} property={property} />) )
            }
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default AllProperties;