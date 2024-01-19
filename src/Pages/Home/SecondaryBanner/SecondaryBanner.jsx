import fashion from "../../../assets/category/fashion.PNG";
import beauty from "../../../assets/category/beauty.PNG";
import electronics from "../../../assets/category/electronics.PNG";
import { NavLink } from "react-router-dom";

const SecondaryBanner = () => {
  return (
    <div className="flex justify-center gap-3 md:gap-7 secondary-banner mb-titleMargin">
      <NavLink className="rounded-lg border-2 border-transparent" to="/fashion">
        <img
          className="w-24 h-16 md:w-32 md:h-24 rounded-lg"
          src={fashion}
          alt=""
        />
      </NavLink>
      <NavLink className="rounded-lg border-2 border-transparent" to="/beauty">
        <img className="w-24 h-16 md:w-32 md:h-24 rounded-lg" src={beauty} alt="" />
      </NavLink>
      <NavLink
        className="rounded-lg border-2 border-transparent"
        to="/electronics"
      >
        <img className="w-24 h-16 md:w-32 md:h-24 rounded-lg" src={electronics} alt="" />
      </NavLink>
    </div>
  );
};

export default SecondaryBanner;
