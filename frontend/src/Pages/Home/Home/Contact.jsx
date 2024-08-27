import { useState, useEffect } from "react";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import { endPoint } from '../../../Component/ForAll/ForAll.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [selectedOption, setSelectedOption] = useState("sale");
  const [loading, setLoading] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1"); // Default to US code

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const codes = data.map((country) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        })).filter(c => c.code); // Filter out countries without a code
        setCountryCodes(codes);
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      option: selectedOption,
      name: e.target.name.value,
      email: e.target.email.value,
      phone: `${selectedCountryCode} ${e.target.phone.value}`,
      project: e.target.project.value,
      message: e.target.message.value,
    };

    fetch(`${endPoint}/inquire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("Successfully sent email to owner.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error sending email to owner.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="my-10 md:flex justify-center w-full mx-auto items-center lg:px-10 gap-5 lg:gap-10 px-5">
      <ToastContainer />
      <div className="md:w-1/2">
        <h2 className="lg:text-6xl text-4xl font-semibold text-black">
          We help to buy and sell your properties.
        </h2>
        <div className="flex gap-3 items-center mt-8">
          <TbHomeSearch className="text-6xl font-semibold text-[#046307] md:text-8xl" />
          <div>
            <h5 className="md:text-3xl text-2xl font-semibold text-black">
              Looking for the new home?
            </h5>
            <p>
              10 new offers every day. 350 offers on-site, trusted by a
              community of thousands of users.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center mt-5">
          <MdOutlineAddHomeWork className="text-6xl font-semibold text-[#046307] md:text-8xl" />
          <div>
            <h5 className="md:text-3xl text-2xl font-semibold text-black">
              Want to sell your home?
            </h5>
            <p>
              10 new offers every day. 350 offers on-site, trusted by a
              community of thousands of users.
            </p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 md:pt-0 pt-12">
        <form onSubmit={handleSubmit} className="bg-black p-10 rounded-[30px]">
          <div className="label text-white">
            <span className="label-text text-white text-xl">I'm interested in:</span>
          </div>
          
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => handleOptionClick("sale")}
              className={`w-fit py-3 px-6 rounded-full ${
                selectedOption === "sale"
                  ? "bg-[#046307] text-white"
                  : "bg-transparent border border-[#ffffff] text-[#ffffff]"
              }`}
            >
              Sale
            </button>
            <button
              type="button"
              onClick={() => handleOptionClick("buy")}
              className={`w-fit py-3 px-6 rounded-full ${
                selectedOption === "buy"
                  ? "bg-[#046307] text-white"
                  : "bg-transparent border border-[#ffffff] text-[#ffffff]"
              }`}
            >
              Buy
            </button>
          </div>

          <div>
            <div className="label mt-4">
              <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                Your name
              </span>
            </div>
            <input
              type="text"
              required
              name="name"
              placeholder="Type name here"
              className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full focus:text-white"
            />
          </div>

          <div>
            <div className="label mt-4">
              <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                Your email
              </span>
            </div>
            <input
              type="email"
              required
              name="email"
              placeholder="Type email here"
              className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full focus:text-white"
            />
          </div>

          <div>
            <div className="label mt-4">
              <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                Your phone
              </span>
            </div>
            <div className="flex w-full">
              <select
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                value={selectedCountryCode}
                className="bg-black border-b-[3px] border-[#ffffff68] w-1/4 focus:border-[#046307] p-3 text-white"
              >
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Type phone number"
                className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] focus:text-white w-3/4"
              />
            </div>
          </div>

          <div>
            <div className="label mt-4">
              <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                Your project
              </span>
            </div>
            <input
              type="text"
              name="project"
              placeholder="Type project name here"
              className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full focus:text-white"
            />
          </div>

          <div>
            <div className="label mt-4">
              <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                Your message
              </span>
            </div>
            <textarea
              className="border-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] text-area w-full mt-4 rounded-3xl focus:text-white"
              placeholder="What is in your mind?"
              rows={4}
              name="message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn bg-[#046307] border-0 text-white w-full rounded-full mt-6"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
