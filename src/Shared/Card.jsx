import { useContext, useState } from "react";
import { Context } from "../context/AuthProvider";
import {
  getLocalstorageData,
  setLocalstorageData,
} from "../localstorage/localstorage";
import useAxios from "../hooks/useAxios/useAxios";

const Card = ({ data }) => {
  const [piece, setPiece] = useState(1);
  const { cartAddition, newUser, cartAddCount, } = useContext(Context);
  const rootAxios = useAxios()
  const { _id, type, image, size, available_number, price, feedback } = data;
  const getData = getLocalstorageData();
  const cartId =  new Date().getTime();
  const email = newUser?.email

  const cartDataObj = {email, type, image, size, price }
  const handleCart= () => {
    if(email){
      rootAxios.post("/cart", cartDataObj)
      .then(res=>console.log(res))
    } else{
      setLocalstorageData(cartId, type, image, size, available_number, price, feedback, piece,_id);
      
    }
    cartAddition();
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img className="w-full h-72" src={image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{type}</h2>
        <p>$ {price}</p>
        <div className="card-actions justify-end">
          <button onClick={() => handleCart()} className="btn btn-primary">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
