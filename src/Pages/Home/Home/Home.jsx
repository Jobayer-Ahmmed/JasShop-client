
import { Outlet } from "react-router-dom"
import Banner from "../Banner/Banner"
import SecondaryBanner from "../SecondaryBanner/SecondaryBanner"
import Discount from "../Discount/Discount"

const Home = () => {


  return (
    <div className="-z-20">
      <Banner/>
      <Discount/>
      <SecondaryBanner/>
      <Outlet/>

    </div>
  )
}

export default Home