import Axios from 'axios'

export const addCart = (iduser, obj) => {
    return (dispatch) => {
        //1. cek cart di id user, mskin product yg di add user
        Axios.get(`http://localhost:2000/transaction/get-cart/${iduser}`)
            .then(res => {
                console.log(res.data) //hasilnya object lngsg {cart:{idproduk:}}
                // console.log(res.data.cart.idproduk)
                // console.log(res.data.length)
                // console.log(res.data.length ===0)
                // console.log(res.data.length ===null)
                // console.log(res.data.length ===undefined)
                // console.log(res.data.cart.length)
                // console.log(res.data.cart.length===0)
                // console.log(res.data.cart.length===null)
                // console.log(res.data.cart.length===undefined)
                console.log(obj)
                let tempCart = []
                let list = []
                let checkName = false

                if (res.data[0] === undefined || res.data[0] === null) {
                // if (res.data.cart.idproduk === undefined || res.data.cart.idproduk === null) {
                    console.log("nul")
                   
                        //     if(obj.qty > obj.dataproduk.stok){
                            //             //comment klo qty lebih dr stock
                            //             obj.qty = obj.dataproduk.stok
                            //         }
                          
                            tempCart.push({produkdibeli: obj.dataproduk, qty: obj.qty, iduser:iduser})
                          
                    console.log({cart:tempCart})
                    Axios.patch(`http://localhost:2000/transaction/addnew-cart/${iduser}`, { cart: tempCart })
                        .then(res => {
                            console.log(res.data)
                            Axios.get(`http://localhost:2000/transaction/get-cart/${iduser}`)
                                .then(res1 => {
                                    console.log([res1.data])
                                    return dispatch({
                                        type: 'CART',
                                        payload: [res1.data,{produkdibeli: obj.dataproduk, qty: obj.qty, iduser:iduser}]
                                    })
                                })
                        })
                }
                // else if (res.data[0] != undefined || res.data[0] !== null) {
                //     //logic extract "name" dari object2 di res.data.cart , save di list unique names & index. 
                //     tempCart = [res.data.cart]
                //     tempCart.forEach((item, index) => {
                //         let tempList = [index, item.name]
                //         list.push(tempList)
                //     })
                //     //compare data.name dengan list of unique names dari res.data.cart
                //     console.log(list)

                //     list.forEach(item => {
                //         if (item[1] === obj.dataproduk.nama) {
                //             //push logic becomes tempCart[i].quantity += data.quantity; tempCart[i].totalPrice = tempCart[i].price * tempCart[i].quantity
                //             console.log(tempCart[item[0]])
                //             console.log(item[0])
                //             console.log(tempCart)
                //             let newQty = tempCart[item[0]].qty + obj.dataproduk.qty
                //             // tempCart[item[0]].qty += data.qty
                //             if (newQty > tempCart[item[0]].stok) {
                //                 //comment klo qty lebih dr stock
                //                 newQty = obj.dataproduk.stok
                //             }
                //             console.log(obj.dataproduk.stok, newQty)
                //             tempCart[item[0]].qty = newQty
                //             checkName = true
                //         }
                //     })
                //     if (!checkName) {
                //         if (obj.dataproduk.qty > obj.dataproduk.stok) {
                //             //comment klo qty lebih dr stock
                //             obj.dataproduk.qty = obj.dataproduk.stok
                //         }
                //         tempCart.push(obj.dataproduk)

                //     }
                //     console.log(tempCart)

                //     Axios.patch(`http://localhost:2000/transaction/add-cart/${iduser}`, { cart: tempCart })
                //         .then(res => {
                //             console.log(res.data)
                //             Axios.get(`http://localhost:2000/transaction/get-cart/${iduser}`)
                //                 .then(res1 => {
                //                     console.log(res1.data)
                //                     return dispatch({
                //                         type: 'CART',
                //                         payload: res1.data
                //                     })
                //                 })
                //         })
                // }



            //     console.log(tempCart)

            //     Axios.patch(`http://localhost:2000/transaction/add-cart/${iduser}`, { cart: tempCart })
            //         .then(res => {
            //             console.log(res.data)
            //             Axios.get(`http://localhost:2000/transaction/get-cart/${iduser}`)
            //                 .then(res1 => {
            //                     console.log(res1.data)
            //                     return dispatch({
            //                         type: 'CART',
            //                         payload: res1.data
            //                     })
            //                 })
            //         })
            })
    }
}

export const delCart = (idUser, idProdCart) => {
    console.log(idUser, idProdCart)
    return (dispatch) => {
        Axios.get(` http://localhost:2000/get-cart/${idUser}`)
            .then(res => {
                let tempCart = res.data.cart

                tempCart.splice(idProdCart, 1)
                console.log(tempCart)
                Axios.patch(`http://localhost:2000/add-cart/${idUser}`, { cart: tempCart })
                    .then(res => {
                        Axios.get(`http://localhost:2000/get-cart/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
                //console.log(tempCart)
            })
    }
}

export const saveCart = (idUser, idProdCart, qtyUpdate) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/transaction/get-cart/${idUser}`)
            .then(res => {
                //tempCart untuk menampung data cart yg sekarang
                let tempCart = res.data.cart

                //tempProd nuntuk menampung data product yang mau kita update qty nya
                let tempProd = res.data.cart[idProdCart]

                //update qty prod yang lama dengan qty yang baru
                tempProd.qty = qtyUpdate

                //kita ganti data cart dengan data product yang sudah kita edit
                tempCart.splice(idProdCart, 1, tempProd)

                //kita patch data cart di user dengan yang terbaru
                Axios.patch(`http://localhost:2000/transaction/add-cart/${idUser}`, { cart: tempCart })
                    .then(res => {
                        //karena data base sudah terupdate maka kita perlu menyesuaikan data update di database
                        //dengan yang ada di redux
                        Axios.get(`http://localhost:2000/transaction/get-cart/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}

export const onCheckout = (idUser, dataTrans) => {
    return (dispatch) => {
        //untuk mencatat data history ke dalam database
        Axios.post(`http://localhost:2000/history`, dataTrans)
            .then(res => {
                let idUser = localStorage.getItem('idUser')
                Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
                    .then(res => {
                        return dispatch({
                            type: 'GET_HISTORY',
                            payload: res.data
                        })
                    })

            })
            .then(res => {
                //untuk mengosongkan cart user
                Axios.patch(`http://localhost:2000/users/${idUser}`, { cart: [] })
                    .then(res => {
                        //untuk update data di redux
                        Axios.get(`http://localhost:2000/users/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })

    }

}

// export const getHistory  = () => {
//     return (dispatch) => {
//         let idUser = localStorage.getItem('idUser')
//         Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
//         .then(res => {
//             return dispatch ({
//                 type: 'GET_HISTORY',
//                 payload:res.data
//             })
//         })

//     }

// }
