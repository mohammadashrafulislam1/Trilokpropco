import { MdOutlineAddHomeWork } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";

const Contact = () => {
  return (
    <div className="my-10 flex justify-center w-full mx-auto items-center px-10">
      <div className="w-1/2">
        <h2 className="text-6xl font-semibold text-black">
          We help to buy and sell your properties.
        </h2>
        <div className="flex gap-3 items-center mt-8">
          <TbHomeSearch className="text-6xl font-semibold text-[#046307]" />
          <div>
            <h4 className="text-4xl font-semibold text-black">
              Looking for the new home?
            </h4>
            <p>
              10 new offers every day. 350 offers on-site, trusted by a
              community of thousands of users.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center mt-5">
          <MdOutlineAddHomeWork className="text-6xl font-semibold text-[#046307]" />
          <div>
            <h4 className="text-4xl font-semibold text-black">
              Want to sell your home?
            </h4>
            <p>
              10 new offers every day. 350 offers on-site, trusted by a
              community of thousands of users.
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <form className="bg-black p-10 rounded-[30px]">
        <div className="label text-white">
              <span className="label-text text-white text-xl">I'm interested in:</span>
            </div>
          <select
            name="option"
            id=""
            className="select select-bordered w-full mt-4"
          >
            <option value="sale">Sale</option>
            <option value="buy">Buy</option>
          </select>

          <div>
            <div className="label mt-4">
              <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">Your name</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Type name here"
              className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full "
            />
          </div>
          <div>
            <div className="label mt-4">
              <span className="label-text border-b-[1px] w-full border-[#ffffff68] text-white">Your email</span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Type email here"
              className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full "
            />
          </div>
          <div>
            <div className="label mt-4">
              <span className="label-text border-b-[1px] w-full border-[#ffffff68] text-white">Your message</span>
            </div>
            <textarea
              className="border-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] text-area w-full mt-4 rounded-3xl"
              placeholder="What is in your mind?"
              rows={4}
              name="message"
            ></textarea>
          </div>

          <input type="submit" value="Send message" className="btn bg-[#046307] border-0 text-white w-full rounded-full mt-6" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
