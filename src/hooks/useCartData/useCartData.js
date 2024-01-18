import { useContext, useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"
import { Context } from "../../context/AuthProvider"



const useCartData = () => {
    const {newUser} = useContext(Context)
    const [cart, setCart] = useState([])
    const rootAxios = useAxios()
    const email = newUser?.email
    useEffect(() => {
        if(email)
        {
            rootAxios.get(`/cart?email=${email}`)
            .then(res => setCart(res.data))
        }
    } , [email, rootAxios])
    return cart
}

    export default useCartData