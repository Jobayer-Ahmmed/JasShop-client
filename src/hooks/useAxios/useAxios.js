import axios from "axios";



const useAxios=()=>{

    const createAxios = axios.create({
        baseURL:"http://localhost:5000"
        // baseURL:""

    })
    return createAxios
}

export default useAxios

