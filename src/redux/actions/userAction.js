import Axios from 'axios';

const URL_API = 'http://localhost:2000/user'

export const login = (data) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/login`, data)
            // .then ( res => {
            //     localStorage.setItem('idUser',res.data.id)
            //     console.log(res.data)
            //      dispatch ({
            //             type: 'LOGIN',
            //             payload: res.data[0]
            // })
            .then(res => {
                console.log(res.data)

                if (res.data.length !== 0) {
                    localStorage.setItem('idUser', res.data[0].iduser)
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data[0]
                    })
                }
                else {
                    dispatch({
                        type: 'FAILED_LOGIN',
                        payload: 'Username/Password is Invalid'
                    })

                }
            })
            .catch(err => {

                console.log(err)
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

// export const logout = () => {
//     return (dispatch) => {
//         //menghapus data idUser di localStorage
//         localStorage.removeItem('token')
//         dispatch({
//             type: 'LOG_OUT'
//         })
//     }
// }

// export const keepLogin = () => {
//     //respons dr BACKEND sql selalu ARRAY jd hrs ambil OBJECT AJA
//     return (dispatch) => {
//         const token = localStorage.getItem('token')
//         if(token){
//             Axios.post(`${URL_API}/keeplogin`,{},{
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//             .then(res => {
//                 console.log(res.data[0])
//                     dispatch({
//                         type: 'LOGIN',
//                         payload: res.data[0]
//                     })
//             })
//         }
    //     const idUser = localStorage.getItem('idUser')
    //     if (idUser) {
    //         Axios.get(`${URL_API}/keeplogin/${idUser}`)
    //             .then(res => {
    //                 return dispatch({
    //                     type: 'LOGIN', //dia sama returnnya sm login jd drpd bkin case baru mending pake case ud ad
    //                     payload: res.data[0]
    //                 })
    //             })
    //     }
//     }

// }

