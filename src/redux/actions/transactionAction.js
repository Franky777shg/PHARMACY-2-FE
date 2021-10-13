import Axios from 'axios'

export const addCart = (id,data) => {
    return (dispatch) => {
        Axios.get (`http://localhost:2000/users/${id}`)
        .then( res => {
            console.log(res.data)
            
            let tempCart = res.data.cart
            //logic extract "name" dari object2 di res.data.cart , save di list unique names & index. 
            let list = []
            tempCart.forEach((item,index) => {
                let tempList = [index,item.name]
                list.push(tempList)
            })
            //compare data.name dengan list of unique names dari res.data.cart
            let checkName = false
            console.log(list)
            list.forEach(item => {
                if(item[1] === data.name){
                    //push logic becomes tempCart[i].quantity += data.quantity; tempCart[i].totalPrice = tempCart[i].price * tempCart[i].quantity
                    console.log(tempCart[item[0]])
                    console.log(item[0])
                    console.log(tempCart)
                    let newQty = tempCart[item[0]].qty + data.qty
                    // tempCart[item[0]].qty += data.qty
                    if(newQty > tempCart[item[0]].stock){
                        //comment klo qty lebih dr stock
                        newQty = data.stock
                    }
                    console.log(data.stock,newQty)
                    tempCart[item[0]].qty = newQty
                    checkName = true                    
                }
            })
            
            if (!checkName) { 
                if(data.qty > data.stock){
                        //comment klo qty lebih dr stock
                        data.qty = data.stock
                    }
                    tempCart.push(data)
                    
             }
            
            console.log(tempCart)
            Axios.patch(`http://localhost:2000/users/${id}`, {cart: tempCart})
            .then ( res => {
                Axios.get(`http://localhost:2000/users/${id}`)
                .then ( res => {
                    console.log(res.data)
                    return dispatch ({
                        type:'LOGIN',
                        payload:res.data
                    })
                })
            })
        })
    }
}

export const delCart = (idUser, idProdCart) => {
    console.log(idUser, idProdCart)
    return (dispatch) => {
        Axios.get(` http://localhost:2000/users/${idUser}`)
        .then(res => {
            let tempCart = res.data.cart
            
            tempCart.splice(idProdCart, 1)
            console.log(tempCart)
            Axios.patch (`http://localhost:2000/users/${idUser}`, {cart: tempCart})
            .then(res => {
                Axios.get(`http://localhost:2000/users/${idUser}`)
                .then(res => {
                    return dispatch({
                        type:'LOGIN',
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
        Axios.get(`http://localhost:2000/users/${idUser}`)
        .then(res=> {
            //tempCart untuk menampung data cart yg sekarang
            let tempCart = res.data.cart
            
            //tempProd nuntuk menampung data product yang mau kita update qty nya
            let tempProd = res.data.cart[idProdCart]

            //update qty prod yang lama dengan qty yang baru
            tempProd.qty = qtyUpdate

            //kita ganti data cart dengan data product yang sudah kita edit
            tempCart.splice (idProdCart,1,tempProd)

            //kita patch data cart di user dengan yang terbaru
            Axios.patch(`http://localhost:2000/users/${idUser}`, {cart:tempCart})
            .then(res => {
                //karena data base sudah terupdate maka kita perlu menyesuaikan data update di database
                //dengan yang ada di redux
                Axios.get(`http://localhost:2000/users/${idUser}`)
                .then(res=> {
                    return dispatch ({
                        type:'LOGIN',
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
            .then (res => {
                return dispatch({
                    type:'GET_HISTORY',
                    payload: res.data
                })
            })
            
        })
        .then(res => {
            //untuk mengosongkan cart user
            Axios.patch(`http://localhost:2000/users/${idUser}`,{cart: []})
            .then(res=> {
                //untuk update data di redux
                Axios.get(`http://localhost:2000/users/${idUser}`)
                .then(res => {
                    return dispatch ({
                        type:'LOGIN',
                        payload: res.data
                    })
                })
            })
        })

    }
    
}

export const getHistory  = () => {
    return (dispatch) => {
        let idUser = localStorage.getItem('idUser')
        Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
        .then(res => {
            return dispatch ({
                type: 'GET_HISTORY',
                payload:res.data
            })
        })

    }

}

// let token = localStorage.getItem("token")
// Axios.patch(`http://localhost:2000/profile/delete`, data, {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     }
// })