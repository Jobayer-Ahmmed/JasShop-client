import { useEffect } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import { useState } from "react";
import Card from "../../Shared/Card"


const Electronics = () => {
  const [electronicsData, setElectronicsData] = useState()
  const rootAxios = useAxios()
  useEffect(()=>{
    rootAxios.get("/electronics")
    .then(res=>setElectronicsData(res.data))
  },[])
  return (
    <div className="mb-myMargin  px-5 lg:px-20 ">
      <div className="bg-orange-800 p-10 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 lg:gap-10">
        {
          electronicsData?.map(data=> <Card key={data._id} data={data}/>)
        }

      </div>
    </div>
  );
};

export default Electronics;
