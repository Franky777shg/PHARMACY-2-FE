import Axios from 'axios'

export const getHistory = (iduser) => {
    return (dispatch) => {
        // let iduser = localStorage.getItem('iduser')
        Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/history/get-history/${iduser}`)
            .then(res => {
                console.log(res.data)
                return dispatch({
                    type: 'GET_HISTORY',
                    payload: res.data
                })
            })

    }

}
export const getonGoing = (iduser) => {
    return (dispatch) => {
        // let iduser = localStorage.getItem('iduser')
        Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/history/get-ongoing/${iduser}`)
            .then(res => {
                console.log(res.data)
                return dispatch({
                    type: 'GET_ONGOING',
                    payload: res.data
                })
            })

    }

}

export const upload_payment = (iduser, foto, body) => {
    //klik tombol upload, msk data payment ke payment_satuan, ubah status waiting for payment approval, msk foto
    console.log(foto)
    console.log(body)
    return (dispatch) => {
        // let iduser = localStorage.getItem('iduser')

        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/history/post-pmt/${iduser}`, body)
            .then(res => {
                console.log(res.data)
                Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/history/upload-pmt/${iduser}`, foto, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res1 => {
                        console.log(res1)
                        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/history/og-wfpa/${iduser}`, body)
                            .then(res2 => {
                                console.log(res2.data)
                                Axios.get(`https://api-pharmacy-2.purwadhikafs2.com/history/get-ongoing/${iduser}`)
                                    .then(res3 => {
                                        return dispatch({
                                            type: 'UPLOAD_PMT',
                                            payload: res3.data.ongoing
                                        })
                                    })
                            })

                    })

            })

    }

}

export const total_payment = (iduser, order_number) => {
    return (dispatch) => {
        // let iduser = localStorage.getItem('iduser')
        Axios.post(`https://api-pharmacy-2.purwadhikafs2.com/history/get-totalbayar/${iduser}`, order_number)
            .then(res => {
                console.log(res.data)
                return dispatch({
                    type: 'TOTAL_PMT',
                    payload: res.data
                })
            })

    }

}

// export const deletePhoto = (data) => {
//     return (dispatch) => {
//         let token = localStorage.getItem("token")
//         Axios.patch(`https://api-pharmacy-2.purwadhikafs2.com/profile/delete`, data, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         })
//             .then(res => {
//                 console.log(res.data)

//                 const token = localStorage.getItem('token')

//                 if (token) {
//                     Axios.post(`${URL_API}/keeplogin`, {}, {
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
//                     })
//                         .then(res => {
//                             console.log(res.data[0])
//                             dispatch({
//                                 type: 'LOGIN',
//                                 payload: res.data[0]
//                             })
//                         })
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }
// }



