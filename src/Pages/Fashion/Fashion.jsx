import { useEffect } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import { useState } from "react";
import Card from "./Card";

const Fashion = () => {
  const [fashionData, setFashionData] = useState()
  const pathAxios = useAxios()
  useEffect(()=>{
    pathAxios.get("/fashion")
    .then(res=>setFashionData(res.data))
  },[])
  return (
    <div className="my-myMargin  px-5 lg:px-20 ">
      <div className="bg-orange-800 p-10 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 lg:gap-10">
        {
          fashionData?.map(data=> <Card key={data._id} data={data}/>)
        }

      </div>
    </div>
  );
};

export default Fashion;
