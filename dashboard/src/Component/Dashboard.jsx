import { useState } from "react";
import "./Dashboard.css";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { FaBell, FaDashcube, FaDev } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { LuTableProperties } from "react-icons/lu";

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const dashNav = (
    <ul className="menu bg-[#fff] text-base-content min-h-full w-full p-4 gap-2 align-middle">
      <li><img src="https://i.ibb.co/55MrgtV/18a006575c097b8b99494b75da063caf.jpg" className="w-1/2"/></li>
      <li><Link to={'/'} className="mt-6 p-3 bg-[#7e7e7e1a] rounded flex items-center gap-2 text-[18px]"><FaDashcube />Dashboard</Link></li>
      <li><Link to={'/properties'} className="p-3 bg-[#7e7e7e1a] rounded flex items-center gap-2 text-[18px]"><LuTableProperties />
      Properties</Link>
      <ul>
        <li><Link to={'/add'} className="p-3 bg-[#7e7e7e1a] rounded flex items-center gap-2 text-[18px] mt-2"><MdOutlineLibraryAdd/>Add Property</Link></li>
        <li><Link to={'/developer'} className="p-3 bg-[#7e7e7e1a] rounded flex items-center gap-2 text-[18px] mt-2"><FaDev/>Developer</Link></li>
        </ul></li>
    </ul>
  );
  return (
    <div className="drawer bg-slate-100">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={handleDrawerToggle}
      />
      <div className="drawer-content overflow-x-auto">
        {/* Page content here */}
        <nav className="navbar bg-[#fff] justify-between">
          <label
            htmlFor="my-drawer"
            className="drawer-button text-black text-2xl"
          >
            {isDrawerOpen ? <RxCross1 /> : <CiMenuFries />}
          </label>
          <div className="flex gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div tabIndex={1} className="text-xl dropdown dropdown-end cursor-pointer" >
              <FaBell />
              <ul
                tabIndex={1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>Notifications</li>
              </ul>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Your page content */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}
        {dashNav}
      </div>
    </div>
  );
};

export default Dashboard;
