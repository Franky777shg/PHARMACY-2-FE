import Axios from 'axios'

export const addCart = (iduser, obj) => {
    return (dispatch) => {
        //1. cek cart di id user, mskin product yg di add user
        Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
            .then(res => {
                // console.log(res.data) //hasilnya object lngsg {cart:{idproduk:}}
                // console.log(res.data.length === undefined)
                // console.log(res.data.cart.length)
                // console.log(res.data.cart.length === 0)

                console.log(obj)
                let tempCart = []
                let list = []
                let checkName = false

                if (res.data.cart.length === 0) {
                    console.log("nul")

                    if (obj.qty > obj.dataproduk.stok) {
                        //comment klo qty lebih dr stock
                        obj.qty = obj.dataproduk.stok
                        console.log(obj.qty)
                    }

                    tempCart.push({ produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser })

                    // console.log({ cart: tempCart })
                    Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/transaction/addnew-cart/${iduser}`, { cart: tempCart })
                        .then(res => {
                            console.log(res.data)
                            Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
                                .then(res1 => {
                                    // console.log(res1.data.cart)
                                    return dispatch({
                                        type: 'CART',
                                        // payload: [res1.data, { produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser }]
                                        payload: res1.data.cart
                                    })
                                })
                        })
                }
               else if (res.data.cart.length !== 0) {
                    //logic extract "name" dari object2 di res.data.cart , save di list unique names & index. 
                //    console.log(res.data.cart)
                //    console.log([res.data.cart])
                    tempCart = res.data.cart
                    let ii = null
                    tempCart.forEach((item, index) => {
                        // console.log(item)
                        // console.log(item.nama)
                        // console.log(item[index])
                        // console.log(item[index].nama)
                            list.push(item.nama)
                    })
                    //compare data.name dengan list of unique names dari res.data.cart
                    // console.log(list)
                    // console.log(tempCart)
                    // console.log(obj.dataproduk.nama)

                    list.forEach((item,index) => {
                        console.log(item)
                        if (item === obj.dataproduk.nama) {
                            //push logic becomes tempCart[i].quantity += data.quantity; tempCart[i].totalPrice = tempCart[i].price * tempCart[i].quantity
                            // console.log(tempCart[index])
                            // console.log(tempCart[index].qty_beli) 
                            // console.log(item[listi[index]])
                            // console.log(tempCart)
                            let newQty = tempCart[index].qty_beli + obj.qty
                            // tempCart[item[0]].qty += data.qty
                            if (newQty > obj.dataproduk.stok) {
                                //comment klo qty lebih dr stock
                                newQty = obj.dataproduk.stok
                            }
                            // console.log(obj.dataproduk.stok, newQty)
                            tempCart[index].qty_beli = newQty
                            // ii.push(index)
                            ii = index
                            checkName = true
                        }
                    })
                    if (checkName ==false) {
                        if (obj.dataproduk.qty_beli > obj.dataproduk.stok) {
                            //comment klo qty lebih dr stock
                            obj.dataproduk.qty_beli = obj.dataproduk.stok
                        }
                        tempCart.push({produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser})
                        console.log({ cart: tempCart })
                        Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/transaction/add-cart/${iduser}`, { cart: tempCart })
                            .then(res => {
                                console.log(res.data)
                                Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
                                    .then(res1 => {
                                        console.log(res1.data.cart)
                                        return dispatch({
                                            type: 'CART',
                                            // payload: [res1.data, { produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser }]
                                            payload: res1.data.cart
                                        })
                                    })
                            })
                    }
                    else if (checkName ==true) {
                        if (obj.dataproduk.qty_beli > obj.dataproduk.stok) {
                            //comment klo qty lebih dr stock
                            obj.dataproduk.qty_beli = obj.dataproduk.stok
                        }
                        tempCart.push({index: ii})
                        // console.log({ cart: tempCart})
                        Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/transaction/addqty-cart/${iduser}`, { cart: tempCart })
                            .then(res => {
                                // console.log(res.data)
                                Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
                                    .then(res1 => {
                                        console.log(res1.data.cart)
                                        return dispatch({
                                            type: 'CART',
                                            // payload: [res1.data, { produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser }]
                                            payload: res1.data.cart
                                        })
                                    })
                            })
                    }
                }



                //     console.log(tempCart)

                //     Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/transaction/add-cart/${iduser}`, { cart: tempCart })
                //         .then(res => {
                //             console.log(res.data)
                //             Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
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

export const delCart = (iduser, idProdCart, ordernumber) => {
    console.log(iduser, idProdCart,ordernumber)
    return (dispatch) => {
        // Axios.get(` https://api-pharmacy-2.purwadhikafs2.com/get-cart/${iduser}`)
        //     .then(res => {
        //         let tempCart = res.data.cart

        //         tempCart.splice(idProdCart, 1)
        //         console.log(tempCart)
                Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/transaction/delrow-cart/${idProdCart}`, ordernumber)
                    .then(res => {
                        console.log(res.data)
                        Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
                            .then(res => {
                                console.log(res.data)
                                return dispatch({
                                    type: 'CART',
                                    payload: res.data.cart
                                })
                            })
                    })
                //console.log(tempCart)
            // })
    }
}

export const saveCart = (iduser, qtyUpdate, ProdCart) => {
    return (dispatch) => {
        console.log(ProdCart)
        // Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
        //     .then(res => {
        //         //tempCart untuk menampung data cart yg sekarang
        //         let tempCart = res.data.cart

        //         //tempProd nuntuk menampung data product yang mau kita update qty nya
        //         let tempProd = res.data.cart[idProdCart]

        //         //update qty prod yang lama dengan qty yang baru
        //         tempProd.qty = qtyUpdate

        //         //kita ganti data cart dengan data product yang sudah kita edit
        //         tempCart.splice(idProdCart, 1, tempProd)

                //kita patch data cart di user dengan yang terbaru
                Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/transaction/saveqty-cart/${iduser}`, ProdCart)
                    .then(res => {
                        console.log(res.data)
                        //karena data base sudah terupdate maka kita perlu menyesuaikan data update di database
                        //dengan yang ada di redux
                        Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-cart/${iduser}`)
                            .then(res1 => {
                                return dispatch({
                                    type: 'CART',
                                    payload: res.data.cart
                                })
                            })
                    })
            // })
    }
}

export const onCheckout = (iduser, dataTrans) => {
    return (dispatch) => {
        console.log(dataTrans)
        //untuk mencatat data history ke dalam database dan ganti status jd waiting for payment
        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/history/og-wfp/${iduser}`, dataTrans)
            .then(res => {
                // let idUser = localStorage.getItem('idUser')
                console.log(res.data)
                Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/transaction/get-ongoing/${iduser}`)
                    .then(res => {
                        return dispatch({
                            type: 'GET_ONGOING',
                            payload: res.data
                        })
                    })

            })
            // .then(res => {
            //     //untuk mengosongkan cart user
            //     Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/transaction/update-produkqty/${iduser}`, { cart: [] })
            //         .then(res => {
            //             //untuk update data stock di redux
            //             Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/transaction/${iduser}`)
            //                 .then(res => {
            //                     return dispatch({
            //                         type: 'LOGIN',
            //                         payload: res.data
            //                     })
            //                 })
            //         })
            // })

    }

}

