import { useEffect } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import { useState } from "react";
import Card from "../../Shared/Card";



const Beauty = () => {
  const [beautyData, setBeautyData] = useState()
  const rootAxios = useAxios()
  useEffect(()=>{
    rootAxios.get("/beauty")
    .then(res=>setBeautyData(res.data))
  },[])
  return (
    <div className="my-myMargin  px-5 lg:px-20 ">
      <div className="bg-orange-800 p-10 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 lg:gap-10">
        {
          beautyData?.map(data=> <Card key={data._id} data={data}/>)
        }

      </div>
    </div>
  );
};

export default Beauty;
