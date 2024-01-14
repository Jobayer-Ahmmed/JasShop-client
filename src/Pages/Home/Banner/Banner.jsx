import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import goods from "../../../assets/goods.jpg"
import female from "../../../assets/female.jpg"
import male from "../../../assets/male.jpg"


const Banner = () => {
  return (
<div className="text-center">
<Carousel autoPlay={true} infiniteLoop={true} interval={3000} showThumbs={false}>
    <div>
        <img src={goods}/>
    </div>
    <div>
        <img src={female} />
    </div>
    {/* <div>
        <img src={male} />
    </div> */}
</Carousel>
</div>
  )
}

export default Banner