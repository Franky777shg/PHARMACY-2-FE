const INITIAL_STATE = {
    id: null,
    date: "",
    time: "",
    order_numb: "",
    image_pay:'',
    totalBelanja: null,
}

const paymentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return {
                ...state,
                id: action.payload.id_payment_resep,
                order_numb: action.payload.order_number,
                image_pay: action.payload.payment_proof_resep,
                totalBelanja: action.payload.total_belanja,

            }

        default:
            return state
    }

}


export default paymentReducer