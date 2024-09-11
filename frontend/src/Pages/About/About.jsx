import { Helmet } from "react-helmet";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import { useEffect, useState } from "react";
import { endPoint } from "../../Component/ForAll/ForAll";

const About = () => {
    const [about, setAbout] = useState();
    console.log(about)
    useEffect(()=>{
        const fetchAbout = async()=>{
            try {
                const response = await fetch(`${endPoint}/about`);
                const data = await response.json();
                setAbout(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
        fetchAbout()
    },[])
    return (
    <div>
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
                <title>About Us - Trilokpropco</title>
                </Helmet>
                <SectionTitle value="About Us" color="white" />
          </div> 

        <div>
            <div>
            <SectionTitle value="Company History" color="black" />
            <p>{about?.history}</p>
            </div>
            <img src={} alt="" />
        </div> 
    </div>
    );
};

export default About;