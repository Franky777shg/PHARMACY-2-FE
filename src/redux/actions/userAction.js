import Axios from 'axios';

const URL_API = 'https://api-pharmacy-2.purwadhikafs2.com/user'

export const login = (data) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/login`, data)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                console.log(res.data)
                dispatch({
                    type: 'LOGIN',
                    payload: res.data.dataUser
                })
                // .then(res => {
                //     console.log(res.data)

                //     if (res.data.length !== 0) {
                //         localStorage.setItem('idUser', res.data[0].iduser)
                //         dispatch({
                //             type: 'LOGIN',
                //             payload: res.data[0]
                //         })
                //     }
                //     else {
                //         dispatch({
                //             type: 'FAILED_LOGIN',
                //             payload: 'Username/Password is Invalid'
                //         })

                //     }
            })
            .catch(err1 => {
                console.log(err1.response.data)
                // // console.log(err.response.data)
                dispatch({
                    type: 'FAILED_LOGIN',
                    payload: err1.response.data
                })
            })
    }
}

export const closeModal = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLOSE_MODAL'
        })
    }
}

export const forgotpw = (body) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/forgotpw`, body)
            .then(res => {
                console.log(res.data)
                if (res.data.length !== 0) {
                    dispatch({
                        type: 'FORGOTPW_OK',
                        payload: 'Email has been sent, kindly follow the instructions'
                    })
                }
                // else {

                // }
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: 'FORGOTPW_NO',
                    payload: 'User with this email does not exists'
                })
            })
    }
}

export const changepw = (data) => {
    console.log(data)
    // console.log(`Bearer ${data.tk}`)
    return (dispatch) => {
        Axios.post(`${URL_API}/changepw`, data, {
            headers: {
                'Authorization': `Bearer ${data.tk}`
            }
        })
            .then(res => {
                console.log(res.data, ", Success!")
                dispatch({
                    type: 'SUCCESSPW',
                    payload: 'Your Password Has Been Changed'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export const logout = () => {
    return (dispatch) => {
        //menghapus data idUser di localStorage
        localStorage.removeItem('token')
        dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const keepLogin = () => {
    //respons dr BACKEND sql selalu ARRAY jd hrs ambil OBJECT AJA
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (token) {
            Axios.post(`${URL_API}/keeplogin`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data[0])
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data[0]
                    })
                })
        }
        // const idUser = localStorage.getItem('idUser')
        // if (idUser) {
        //     Axios.get(`${URL_API}/keeplogin/${idUser}`)
        //         .then(res => {
        //             return dispatch({
        //                 type: 'LOGIN', //dia sama returnnya sm login jd drpd bkin case baru mending pake case ud ad
        //                 payload: res.data[0]
        //             })
        //         })
        // }
    }

}


export const verification = (token) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/verification`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const uploadFile = (data) => {
    return (dispatch) => {
        let token = localStorage.getItem("token")
        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/profile/upload`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)

                const token = localStorage.getItem('token')

                if (token) {
                    Axios.post(`${URL_API}/keeplogin`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            console.log(res.data[0])
                            dispatch({
                                type: 'LOGIN',
                                payload: res.data[0]
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const deletePhoto = (data) => {
    return (dispatch) => {
        let token = localStorage.getItem("token")
        Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/profile/delete`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data)

                const token = localStorage.getItem('token')

                if (token) {
                    Axios.post(`${URL_API}/keeplogin`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            console.log(res.data[0])
                            dispatch({
                                type: 'LOGIN',
                                payload: res.data[0]
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addResepAct = (newData) => { //OK
    return (dispatch) => {
        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/profile/newdata`, newData)
            .then(res => {
                console.log(res.data)
                console.log(res.data.date)
                console.log(res.data.order_number)

                let data2 = {
                    order_number: res.data.order_number
                }
                console.log(data2)

                Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/profile/resepbyid`, data2)
                    .then(res1 => {
                        // console.log(res1.data[0])
                        // console.log(res1.data[0].order_number)
                        dispatch({
                            type: 'RESEP',
                            payload: res1.data[0]
                        })
                        const token = localStorage.getItem('token')

                        if (token) {
                            Axios.post(`${URL_API}/keeplogin`, {}, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(res => {
                                    // console.log(res.data[0])
                                    dispatch({
                                        type: 'LOGIN',
                                        payload: res.data[0]
                                    })
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }
}


export const uploadResep = (data, id) => {
    return (dispatch) => {
        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/profile/resep/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: 'RESEP_IMG',
                    payload: res.data
                })
                const token = localStorage.getItem('token')

                if (token) {
                    Axios.post(`${URL_API}/keeplogin`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            // console.log(res.data[0])
                            dispatch({
                                type: 'LOGIN',
                                payload: res.data[0]
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addPayment = (newData) => { //OK
    return (dispatch) => {
        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/payment/newdatapayment`, newData)
            .then(res => {
                console.log(res.data)
                console.log(res.data.order_number)

                let data2 = {
                    order_number: res.data.order_number
                }
                console.log(data2)

                Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/payment/paymentbyid`, data2)
                    .then(res1 => {
                        // console.log(res1.data[0])
                        // console.log(res1.data[0].id_payment_resep)
                        // console.log(res1.data[0].order_number)
                        // console.log(res1.data[0].image_resep)
                        dispatch({
                            type: 'ADD_DATA',
                            payload: res1.data[0]
                        })
                        const token = localStorage.getItem('token')

                        if (token) {
                            Axios.post(`${URL_API}/keeplogin`, {}, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(res => {
                                    // console.log(res.data[0])
                                    dispatch({
                                        type: 'LOGIN',
                                        payload: res.data[0]
                                    })
                                })
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addPayment2 = (newData) => { //OK
    return (dispatch) => {
        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/payment/newdatapayment`, newData)
            .then(res => {
                console.log(res.data)
                console.log(res.data.order_number)

                let data2 = {
                    order_number: res.data.order_number
                }
                console.log(data2)

                Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/payment/paymentbyid`, data2)
                    .then(res1 => {
                        console.log(res1.data[0])
                        // console.log(res1.data[0].id_payment_resep)
                        // console.log(res1.data[0].order_number)
                        // console.log(res1.data[0].image_resep)
                        dispatch({
                            type: 'ADD_DATA2',
                            payload: res1.data[0]
                        })
                        const token = localStorage.getItem('token')

                        if (token) {
                            Axios.post(`${URL_API}/keeplogin`, {}, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(res => {
                                    // console.log(res.data[0])
                                    dispatch({
                                        type: 'LOGIN',
                                        payload: res.data[0]
                                    })
                                })
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getDataAwal = () => { //OK
    return (dispatch) => {
        let token = localStorage.getItem("token")
        Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/user/userbyid`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data[0].iduser)
                let data2 = {
                    iduser: res.data[0].iduser
                }
                console.log(data2)
                Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/profile/cekdata`, data2)
                    .then(res => {

                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log('eror cek Data')
                    })
                const token = localStorage.getItem('token')

                if (token) {
                    Axios.post(`${URL_API}/keeplogin`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            // console.log(res.data[0])
                            dispatch({
                                type: 'LOGIN',
                                payload: res.data[0]
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}


