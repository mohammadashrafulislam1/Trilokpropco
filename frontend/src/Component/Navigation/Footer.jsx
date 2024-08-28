import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaRegEnvelope, FaWhatsapp, FaX, FaXRay, FaYoutube } from "react-icons/fa6";
import { AiFillCaretRight } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";

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
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        
    }} className="md:flex md:gap-3 md:px-5 justify-center md:h-[400px] md:py-0 py-10 px-10">
        <div className="md:w-[30%] w-full">
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
        
        <div className="md:w-[20%] w-full">
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

        <div className="md:w-[20%] w-full">
        <h6 className="text-xl font-semibold text-black mb-6">Support & Summary</h6>

        <div className="flex gap-3 flex-col">
        <a href=""><p>Helping Center</p></a>
        <a href=""><p>Privacy & Policy</p></a>
        <a href=""><p>Buy or Rent</p></a>
        <a href=""><p>Properties</p></a>
        <a href=""><p>Blogs</p></a>
        </div>
        </div>

        <div className="md:w-[30%] w-full">
        <h6 className="text-xl font-semibold mt-6 text-black mb-5">Contact Us</h6>
        
      <div className="flex gap-3 flex-col">
        <div className="flex gap-3 items-center">
        <div className="w-[10%]">  <div className="bg-[#2a323c34] w-[40px] h-[40px] flex items-center justify-center text-[20px] rounded-full"><FaRegEnvelope /></div></div>
        <div>
        <p className="text-[18px] text-black font-semibold">E-mail </p>
        <a href="">
        <p>{footers?.email}</p></a>
        </div>
        </div>
        
        <div className="flex gap-3 items-center">
        <div className="w-[10%]"> <div className="bg-[#2a323c34] w-[40px] h-[40px] flex items-center justify-center text-[20px] rounded-full"><FaPhone /></div></div>
        <div>
        <p className="text-[18px] text-black font-semibold">Contact</p>
        <a href="">
        <p>{footers?.contact}</p></a>
        </div>
        </div>
        
        <div className="flex gap-3 items-center">
        <div className="w-[10%]">
        <div className="bg-[#2a323c34] !w-[40px] !h-[40px] flex items-center justify-center text-[20px] rounded-full"><CiLocationOn /></div>
        </div>
        <div>
        <p className="text-[18px] text-black font-semibold">Location</p>
        <a href="">
        <p>{footers?.location}</p></a>
        </div>
        </div>
        </div>
        </div>
    </div>
    );
};

export default Footer;