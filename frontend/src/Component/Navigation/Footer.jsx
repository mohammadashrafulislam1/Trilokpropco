import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaX, FaXRay, FaYoutube } from "react-icons/fa6";
import { AiFillCaretRight } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

// https://i.ibb.co/dkBPKPz/footer-bg.webp
const Footer = () => {
    const [footers, setFooters] = useState();
    console.log(footers)
    useEffect(()=>{
     const fetchFooters = async()=>{
      const response = await fetch(`${endPoint}/footer`);
      const data = await response.json();
      setFooters(data[0])
     }
     fetchFooters()
    },[])
    return (
    <div style={{
        background: 'url(https://i.ibb.co/dkBPKPz/footer-bg.webp), #F4F6F8',
        backgroundPosition:'center',
        backgroundSize:'contain',
        opacity:'0.8',
        height:'400px',
        display:'flex'
    }}>
        <div className="w-1/4">
          <img src={footers?.image} alt="" className="w-[105px] h-[53px]"/>
          <p>{footers?.description}</p>
          <h6 className="text-xl font-semibold mt-4 text-black">Follow us</h6>

           <div className="flex gap-2">
           <a href={footers?.facebook}><div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl"><FaFacebook/></div></a>
           <a href={footers?.instagram}><div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl"><FaInstagram/></div></a>
           <a href={footers?.linkedin}><div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl"><FaLinkedin/></div></a>
           <a href={footers?.twitter}><div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl"><FaX/></div></a>
           <a href={footers?.
whatsapp}><div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl"><FaWhatsapp/></div></a>
<a href={footers?.
youtube}><div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl"><FaYoutube/></div></a>
           </div>
        </div>
        <div className="w-1/4">
        <h6 className="text-xl font-semibold mt-4 text-black mb-6">About Us</h6>
        <div className="flex gap-3 flex-col">
        <a href="">
        <p className="text-[#1B5638] font-[400] flex items-center mb-4"><span className="flex gap-[-10px]"><GoDotFill /><AiFillCaretRight /></span> How It Work</p>
        </a>

        <a href=""><p>Our Story</p></a>
        <a href=""><p>Career</p></a>
        <a href=""><p>Contact Us</p></a>
        <a href=""><p>FAQ's</p></a>
        
        </div>
        </div>

        <div className="w-1/4">

        </div>

        <div className="w-1/4">
            
        </div>
    </div>
    );
};

export default Footer;