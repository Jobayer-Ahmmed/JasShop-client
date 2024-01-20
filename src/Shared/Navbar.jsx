import { NavLink, useNavigate } from "react-router-dom";
import { CgMenuCake } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { TiShoppingCart } from "react-icons/ti";
import useCartData from "../hooks/useCartData/useCartData";
import { getLocalstorageData } from "../localstorage/localstorage";
import jasshop from "../assets/jasshop.PNG"

const Navbar = () => {
  const [toggle, setToggle] = useState(true); 
  const { newUser, logOut } = useContext(Context);
  const navigate = useNavigate();
  const cartDB = useCartData()
  const cartLocal = getLocalstorageData()

  const email = newUser?.email;

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function for the animation
    });
  }, []);



  const navlinks = (
    <>
      <li data-aos="zoom-in">
        <NavLink>Home</NavLink>
      </li>
      <li data-aos="zoom-in">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li data-aos="zoom-in">
        <NavLink to="/register">Register</NavLink>
      </li>
    </>
  );
  return (
    <div className="fixed lg:px-20 px-[10%] flex items-center justify-between bg-opacity-70 bg-priColor w-full h-16 text-white  z-50 ">
      <div className=" flex items-center gap-5">
        <div className="block lg:hidden">
          {toggle ? (
            <button onClick={() => setToggle(!toggle)} className="">
              <CgMenuCake className="text-3xl" />
            </button>
          ) : (
            <button onClick={() => setToggle(!toggle)} className="">
              <RxCross2 className="text-3xl" />
            </button>
          )}
        </div>
        <span><img className="w-20" src={jasshop} alt="" /></span>
      </div>
      <div>
        <ul
          className={` z-10 absolute left-5  flex flex-col gap-5 rounded text-center p-10 bg-priColor text-xl font-medium ${
            toggle
              ? "absolute -top-96 transition-[0.9]"
              : "  top-16 transition-[0.7]"
          }`}
        >
          {navlinks}
        </ul>
        <div className=" flex items-center  py-5 relative ">
          <div className="w-full flex justify-between">
            <div className="rounded text-lg hidden lg:block font-medium text-center text-white ">
              <ul className="flex justify-center gap-10">{navlinks}</ul>
            </div>
            <div className="ml-0 lg:ml-16">
              <TiShoppingCart
                onClick={() => navigate("/cart")}
                className="text-4xl cursor-pointer"
              />
            </div>
            <div className="w-8 h-6 rounded-full bg-red-700 flex justify-center items-center -ml-4 -mt-2">
              <p className="text-white flex justify-center ">
                <small>{email? cartDB?.length : cartLocal?.length}</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {newUser?.displayName ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <img
              className="btn btn-circle w-12 h-12 rounded-full"
              src={newUser?.photoURL}
              alt=""
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] text-lg menu py-4 pl-10 shadow bg-base-100 rounded-box w-52"
          >
            <li>{newUser.displayName}</li>
            <li onClick={handleLogout} className="cursor-pointer mt-3">
              Log Out
            </li>
          </ul>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Navbar;
