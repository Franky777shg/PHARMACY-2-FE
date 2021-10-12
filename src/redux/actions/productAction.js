import Axios from 'axios';
import { AccordionCollapse } from 'react-bootstrap';

const URL_API = 'http://localhost:2000/product'

export const uploadProduct1 = (foto, data) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/add-product1foto`, foto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                // console.log(res.data.data[0].idproduk)
                console.log(res.data)
                const hasil = res.data
                const kirim = { ...data, hasil }
                Axios.post(`${URL_API}/add-product1data`, kirim)
                    .then(res => {
                        console.log(res.data.data[0].idproduk)
                        // console.log(res.data)
                        dispatch({
                            type: 'RENDER_ADDPRODUCT1',
                            payload: res.data.data[0].idproduk

                        })
                        // this.fetchData()
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch({
                            type: 'RENDER_ADDPRODUCT1_FAIL',
                            payload: err.response.data

                        })
                    })
                // const token = localStorage.getItem('token')
                // if(token){
                //     Axios.post(`${URL_API}/keeplogin`,{},{
                //         headers: {
                //             'Authorization': `Bearer ${token}`
                //         }
                //     })
                //     .then(res => {
                //         console.log(res.data[0])
                //             dispatch({
                //                 type: 'LOGIN',
                //                 payload: res.data[0]
                //             })
                //     })
                // }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const uploadProductR = (foto, data) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/add-productrfoto`, foto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                // console.log(res.data.data[0].idproduk)
                console.log(res.data)
                const hasil = res.data
                const kirim = { ...data, hasil }
                Axios.post(`${URL_API}/add-productrdata`, kirim)
                    .then(res => {
                        console.log(res.data.data[0].idproduk_resep)
                        // console.log(res.data)
                        dispatch({
                            type: 'RENDER_ADDPRODUCTR',
                            payload: res.data.data[0].idproduk_resep

                        })
                        // this.fetchData()
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch({
                            type: 'RENDER_ADDPRODUCTR_FAIL',
                            payload: err.response.data

                        })
                    })
                // const token = localStorage.getItem('token')
                // if(token){
                //     Axios.post(`${URL_API}/keeplogin`,{},{
                //         headers: {
                //             'Authorization': `Bearer ${token}`
                //         }
                //     })
                //     .then(res => {
                //         console.log(res.data[0])
                //             dispatch({
                //                 type: 'LOGIN',
                //                 payload: res.data[0]
                //             })
                //     })
                // }
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export const editProduct1 = (foto, data,idproduct) => {
    console.log(foto)
    console.log(data)
    console.log(data.message)
    return (dispatch) => {
        //kalo edit data doang
        // if (data.message !== 0){
        //     Axios.post(`${URL_API}/edit-product1data/${idproduct}`, data)
        //     .then(res => {
        //         // console.log(res.data.data[0].idproduk)
        //         console.log(res.data)
        //         dispatch({
        //             type: 'EDITPRODUCT1',
        //             payload: res.data

        //         })
        //         // this.fetchData()
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         dispatch({
        //             type: 'EDITPRODUCT1_FAIL',
        //             payload: err.response.data

        //         })
        //     })
        // }
        //kalo edit foto doang
        // else if (data.message === 0){
        //     Axios.post(`${URL_API}/edit-product1foto/${idproduct}`, foto, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //     .then(res => {
        //         console.log(res.data.data[0].idproduk)  
        //         // console.log(res.data)
        //         dispatch({
        //             type: 'EDITPRODUCT1',
        //             payload: 'Berhasil update produk'

        //         })
        //         // this.fetchData()
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         dispatch({
        //             type: 'EDITPRODUCT1_FAIL',
        //             payload: err.response.data

        //         })
        //     })

        // }
        //kalo edit foto dan data
        // if (data.message === 0) {
            Axios.post(`${URL_API}/edit-product1foto/${idproduct}`, foto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                // console.log(res.data.data[0].idproduk)
                console.log(res.data)
                // const hasil = res.data
                // const kirim = { ...data, hasil }
                Axios.post(`${URL_API}/edit-product1data/${idproduct}`, data)
                    .then(res => {
                        // console.log(res.data.data[0].idproduk)
                        // console.log(res.data)
                        dispatch({
                            type: 'EDITPRODUCT1',
                            payload: 'Berhasil update produk'

                        })
                        // this.fetchData()
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch({
                            type: 'EDITPRODUCT1_FAIL',
                            payload: err.response.data

                        })
                    })
                // const token = localStorage.getItem('token')
                // if(token){
                //     Axios.post(`${URL_API}/keeplogin`,{},{
                //         headers: {
                //             'Authorization': `Bearer ${token}`
                //         }
                //     })
                //     .then(res => {
                //         console.log(res.data[0])
                //             dispatch({
                //                 type: 'LOGIN',
                //                 payload: res.data[0]
                //             })
                //     })
                // }
            })
            .catch(err => {
                console.log(err)
            })
        // }
    }
}

export const editProductR = (foto, data,idproduct) => {
    console.log(foto)
    console.log(data)
    console.log(data.message)
    return (dispatch) => {
        //kalo edit data doang
        // if (data.message !== 0){
        //     Axios.post(`${URL_API}/edit-productrdata/${idproduct}`, data)
        //     .then(res => {
        //         // console.log(res.data.data[0].idproduk)
        //         console.log(res.data)
        //         dispatch({
        //             type: 'EDITPRODUCT1',
        //             payload: res.data

        //         })
        //         // this.fetchData()
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         dispatch({
        //             type: 'EDITPRODUCT1_FAIL',
        //             payload: err.response.data

        //         })
        //     })
        // }
        //kalo edit foto doang
        // else if (data.message === 0){
        //     Axios.post(`${URL_API}/edit-productrfoto/${idproduct}`, foto, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //     .then(res => {
        //         console.log(res.data.data[0].idproduk)  
        //         // console.log(res.data)
        //         dispatch({
        //             type: 'EDITPRODUCT1',
        //             payload: 'Berhasil update produk'

        //         })
        //         // this.fetchData()
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         dispatch({
        //             type: 'EDITPRODUCT1_FAIL',
        //             payload: err.response.data

        //         })
        //     })

        // }
        //kalo edit foto dan data
        // if (data.message === 0) {
            Axios.post(`${URL_API}/edit-productrfoto/${idproduct}`, foto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                // console.log(res.data.data[0].idproduk)
                console.log(res.data)
                // const hasil = res.data
                // const kirim = { ...data, hasil }
                Axios.post(`${URL_API}/edit-productrdata/${idproduct}`, data)
                    .then(res => {
                        // console.log(res.data.data[0].idproduk)
                        // console.log(res.data)
                        dispatch({
                            type: 'EDITPRODUCT1',
                            payload: 'Berhasil update produk'

                        })
                        // this.fetchData()
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch({
                            type: 'EDITPRODUCT1_FAIL',
                            payload: err.response.data

                        })
                    })
                // const token = localStorage.getItem('token')
                // if(token){
                //     Axios.post(`${URL_API}/keeplogin`,{},{
                //         headers: {
                //             'Authorization': `Bearer ${token}`
                //         }
                //     })
                //     .then(res => {
                //         console.log(res.data[0])
                //             dispatch({
                //                 type: 'LOGIN',
                //                 payload: res.data[0]
                //             })
                //     })
                // }
            })
            .catch(err => {
                console.log(err)
            })
        // }
    }
}

