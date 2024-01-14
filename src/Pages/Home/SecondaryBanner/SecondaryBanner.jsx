import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";

import a from "../../../assets/a.jpg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import fashion from "../../../assets/category/fashion.PNG"
import beauty from "../../../assets/category/beauty.PNG"
import electronics from "../../../assets/category/electronics.PNG"
import furniture from "../../../assets/category/furniture.PNG"


const secondaryBanner = () => {
  // const [item, setItem] = useState("")
  const handleSecondaryMenu=(props)=>{

  }
  return (
    <div className="px-[10%] lg:px-20 my-xPadding secondaryMenu">
      <div className="">
        <Swiper
          slidesPerView={4} // akta page a koi ta slide/ image dekha be
                                    // spaceBetween={2}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <NavLink className="" to="/fashion" >
              <img src={fashion} alt="" className="w-32 h-28" />
              <p>Fashion</p>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/fashion">
              <img src={beauty} alt="" className="w-32 h-28"  />
              <p>Beauty</p>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/fashion">
              <img src={electronics} alt="" className="w-32 h-28"  />
              <p>Electronics</p>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/fashion">
              <img src={furniture} alt="" className="w-32 h-28"  />
              <p>Furniture</p>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/fashion">
              <img src={a} alt="" className="w-32 h-28"  />
              <p>Fashion</p>
            </NavLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default secondaryBanner;
