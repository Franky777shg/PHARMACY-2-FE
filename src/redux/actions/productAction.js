import Axios from 'axios';

const URL_API = 'http://localhost:2000/product'

export const uploadProduct1 = (data,id) => {
    return (dispatch) => {
        Axios.post(`http://localhost:2000/profile/upload/${id}`, data, {
            headers: {
                'Content-Type' :'multipart/form-data'
            }
        })
        .then( res => {
            console.log(res.data)
            const token = localStorage.getItem('token')
            if(token){
                Axios.post(`${URL_API}/keeplogin`,{},{
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
        .catch( err =>{
            console.log(err)
        })
    }
}
