import Axios from 'axios';

const URL_API = 'http://localhost:2000/payment'

export const addPayment = (newData) => { //OK
    return(dispatch) => {
        Axios.post(`${URL_API}/newdatapayment`, newData)
        .then(res => {
            console.log(res.data)
            // console.log(res.data.date)
            // console.log(res.data.order_number)
            dispatch({
                type: 'ADD_DATA',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}
