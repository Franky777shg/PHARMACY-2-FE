import Axios from 'axios'

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