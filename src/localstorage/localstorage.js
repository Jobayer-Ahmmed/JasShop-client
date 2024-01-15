



const getLocalstorageData = () => {
    const data = localStorage.getItem("JasShopCart")
    if (data) {
        const jsonData = JSON.parse(data)
        return jsonData
    }
    return []
}


const setLocalstorageData = (cartId, type, image, size, available_number, price, feedback, piece,_id ) => {

    const getData = getLocalstorageData()
    getData.push({ cartId, type, image, size, available_number, price, feedback, piece,_id  })
    const strData = JSON.stringify(getData)
    localStorage.setItem("JasShopCart", strData)
}

const removeLocalstorageData = (cartId) => {
    console.log(cartId)
    let getData = getLocalstorageData()
    const updatedData = getData.filter(data => data.cartId != cartId)
    console.log(updatedData)

    getData = []
    getData.push(...updatedData)
    const str = JSON.stringify(getData)
    localStorage.setItem("JasShopCart", str)

}


export { getLocalstorageData, setLocalstorageData, removeLocalstorageData }



