import { FaRegHeart } from "react-icons/fa6";
import "./Navigation.css";
import { IoGitCompareOutline, IoMenu } from "react-icons/io5";

const Header = () => {
  const menuLiMobile = (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ml-10"
    >
      <li>
        <a>Property</a>
      </li>
      <li>
        <a>Services
        </a>
      </li>
      <li>
        <a>Blog</a>
      </li>
      <li>
        <a>Contact</a>
      </li>
    </ul>
  );

  const menuLiLarge = (
    <ul className="menu menu-horizontal px-1">
     <li>
        <a>Property</a>
      </li>
      <li>
        <a>Services
        </a>
      </li>
      <li>
        <a>Blog</a>
      </li>
      <li>
        <a>Contact</a>
      </li>
    </ul>
  );

  return (
    <div className="nav-section navbar">
     
     <div className="navbar-start">
        
        {/* mobile responsive */}
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white text-[22px] menu-icon">
            <IoMenu />
        </div>
        {menuLiMobile}
      </div>
      {/* ---------- */}
      <a href="/">
        <div className="md:w-[104px] lg:h-[50px] navbar-start">
          <img src="https://i.ibb.co/stKQtrJ/1000278004-1.webp" alt="" className="logo"/>
        </div>
      </a>
     </div>

      <nav className="navbar-center navbar-end">
        <div className="hidden lg:flex text-white">{menuLiLarge}</div>
      </nav>

      <div className="flex items-center gap-4 navbar-end">
        {/* Compare icon  */}
        <div className="text-white text-[12px] lg:text-[25px] indicator border border-white rounded-full p-1 lg:p-2 mr-3">
          <span className="indicator-item badge bg-[#046307] text-white border-0">
            0
          </span>
          <IoGitCompareOutline />
        </div>

        {/* Fav icon  */}
        <div className="text-white text-[12px] lg:text-[25px] indicator border border-white rounded-full p-1 lg:p-2">
          <span className="indicator-item badge bg-[#046307] text-white border-0">
            0
          </span>
          <FaRegHeart />
        </div>

        
      </div>
    </div>
  );
};

export default Header;
