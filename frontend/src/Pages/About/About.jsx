import { Helmet } from "react-helmet";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import { useEffect, useState } from "react";
import { endPoint } from "../../Component/ForAll/ForAll";

const About = () => {
    const [about, setAbout] = useState();
    const [footer, setFooter] = useState();
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

        const fetchFooter = async()=>{
            try {
                const response = await fetch(`${endPoint}/footer`);
                const data = await response.json();
                setFooter(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
        fetchFooter()
    },[])

    console.log(footer)
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

        <div className="flex gap-5 mx-14 rounded-lg shadow-2xl mt-20 mb-10 p-14 text-black items-center bg-[#04630742]">
            <div>
           <h2 className="text-3xl font-semibold mb-2">Company History</h2>
            <p>{about?.history}</p>
            </div>
            <img src={footer[0]?.image} alt="Trilokpropco - Real Estate Agency." className="w-[300px] h-[180px]" />
        </div> 

        <div className="mx-14 mt-10 mb-14 md:flex items-center gap-5">
            <div className="flex gap-5 items-center bg-[#04630742] p-8 rounded-lg shadow-2xl w-1/2 md:h-[350px]">
                <div>
                <h2 className="text-3xl font-semibold mb-2">Our Mission</h2>
                <p>{about?.mission}</p>
                </div>
                <img src="https://i.ibb.co.com/NynhxyC/pngegg-2.webp" alt="Trilokpropco - Our Mission" className="w-[300px] h-[180px]" />
            </div>

            <div className="flex gap-5 items-center bg-[#04630742] p-8 rounded-lg shadow-2xl w-1/2 md:h-[350px]">
                <div>
                <h2 className="text-3xl font-semibold mb-2">Our Vision</h2>
                <p>{about?.vision}</p>
                </div>
                <img src="https://i.ibb.co.com/hFqyrJL/pngwing-com-3.webp" alt="Trilokpropco - Our Vision" className="w-[300px] h-[180px]" />
            </div>
        </div>

        <div className="flex gap-5 mx-14 rounded-lg shadow-2xl mt-20 mb-10 p-14 text-black items-center bg-[#ffffff1d] border">
            <img src={about?.founderLogo} alt="Mr. Anirban Manna - Trilok Propco" className="w-[400px] rounded-lg"/>
            <div>
            <h2 className="text-3xl font-semibold mb-2">Founder</h2>
            <p>{about?.founder}</p>
            </div>
        </div>

        <div>
            <SectionTitle value="why choose us" className="mt-5"/>
        </div>
    </div>
    );
};

export default About;