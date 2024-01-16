import {FaTrashAlt} from "react-icons/fa"
import { removeLocalstorageData } from "../../localstorage/localstorage";
import { Context } from "../../context/AuthProvider";
import { useContext } from "react";
import useAxios from "../../hooks/useAxios/useAxios";


const Cart = ({data}) => {
  const { cartAddition, newUser} = useContext(Context);
  const rootAxios = useAxios()
    const { cartId, type, image, size, available_number, price, feedback, piece,_id } = data
    const email = newUser?.email
    const handleRemoveCartItem=()=>{
      if(email){
        rootAxios.delete(`/cart?id=${_id}`)
        .then(res=>console.log(res))
      } else{
        removeLocalstorageData(cartId)
        cartAddition()
      }

    }

  return (
    <div className="text-2xl font-medium text-black mb-6 rounded-lg flex justify-between items-center bg-white py-2 px-5 lg:px-10">
        <img className="h-28 w-28 rounded-lg border-2 border-black" src={image} alt="" />
        <h4>$ {price}</h4>
        <FaTrashAlt onClick={handleRemoveCartItem} className="cursor-pointer text-red-500"/>
    </div>
  )
}

export default Cart