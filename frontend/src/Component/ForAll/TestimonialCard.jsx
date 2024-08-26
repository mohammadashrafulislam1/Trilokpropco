import { IoMdQuote } from "react-icons/io";

const TestimonialCard = (testimonial) => {
    console.log(testimonial?.testimonial)
    const truncateText = (str, numWords) => {
        const words = str.split(" ");
        if (words.length > numWords) {
          return words.slice(0, numWords).join(" ") + "...";
        }
        return str;
      };
    return (
    <div className="">
         <div><img src={testimonial?.testimonial?.image} alt={testimonial?.testimonial?.name} className="w-20 h-20 mb-[-40px] ml-8 shadow-md rounded-full"/></div>  
        <div className="border-[#c6c6c67d] border-[1px] p-5 pb-8 shadow-md rounded-lg">
            <h1 className="text-5xl text-[#1829412d] text-end flex justify-end w-[360px]"><IoMdQuote/>
            </h1>
            <p className="text-[#929292] mb-8 text-[14px]">{truncateText((testimonial?.testimonial?.details), 19)} <span>more..</span></p>
            
            <hr />
            <div className="mt-10">
                <h5 className="font-semibold">{testimonial?.testimonial?.name}</h5>
                <p className="text-[#929292]">{testimonial?.testimonial?.des}</p>
            </div>
        </div> 
    </div>
    );
};

export default TestimonialCard;