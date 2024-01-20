import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import goods from "../../../assets/goods.jpg"
import female from "../../../assets/female.jpg"
import shirt from "../../../assets/shirt.jpg"
import watch from "../../../assets/watch.jpg"


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
    <div>
        <img src={shirt} />
    </div>
    <div>
        <img src={watch} />
    </div>
</Carousel>
</div>
  )
}

export default Banner