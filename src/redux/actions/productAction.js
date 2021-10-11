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
                            payload: res.data.data[0].idproduk

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
