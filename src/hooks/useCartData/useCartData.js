import { useContext, useEffect, useState } from "react"
// import useAxios from "../useAxios/useAxios"
import { Context } from "../../context/AuthProvider"
import axios from "axios"


const useCartData = () => {
    const {newUser} = useContext(Context)
    const [cart, setCart] = useState([])
    // const rootAxios = useAxios()
    const email = newUser?.email
    useEffect(() => {
        if(email)
        {
            axios.get(`http://localhost:5000/cart?email=${email}`)
            .then(res => setCart(res.data))
        }
    } , [email])
    return cart
}

    export default useCartData