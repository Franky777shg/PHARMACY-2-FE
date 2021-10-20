import Axios from 'axios'

export const getHistory  = (iduser) => {
    return (dispatch) => {
        // let iduser = localStorage.getItem('iduser')
        Axios.get(`http://localhost:2000/history/get-history/${iduser}`)
        .then(res => {
            console.log(res.data)
            return dispatch ({
                type: 'GET_HISTORY',
                payload:res.data
            })
        })

    }

}
export const getonGoing  = (iduser) => {
    return (dispatch) => {
        // let iduser = localStorage.getItem('iduser')
        Axios.get(`http://localhost:2000/history/get-ongoing/${iduser}`)
        .then(res => {
            console.log(res.data)
            return dispatch ({
                type: 'GET_ONGOING',
                payload:res.data
            })
        })

    }

}

export const upload_payment = (iduser,fotodandata) => {
    return (dispatch) => {
        // let iduser = localStorage.getItem('iduser')
        Axios.post(`http://localhost:2000/history/upload-pmt/${iduser}`,fotodandata,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res.data)
            return dispatch ({
                type: 'UPLOAD_PMT',
                payload:res.data.ongoing
            })
        })

    }

}

