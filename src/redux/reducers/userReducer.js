const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    email: "",
    role: "",
    failedLogin: false,
    msgFailedLogin: "",
    forgotpw_ok: "",
    forgotpw_no: "",
    forgot: false,
    profilePic: '',
    forgot1: false,
    successpw: "",
    changed: false,
    role: "",
    idResep: null,
    resepPic: "",
    orderNumb: '',
    idPayment: null,
    paymentPic: '',
    cart: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.iduser,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                role: action.payload.role,
                profilePic: action.payload.profile_picture,
                cart: action.payload.cart
            }
        case 'FAILED_LOGIN':
            return {
                ...state,
                failedLogin: true,
                msgFailedLogin: action.payload
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                failedLogin: false,
                msgFailedLogin: ""
            }
        case 'FORGOTPW_OK':
            return {
                ...state,
                forgot: true,
                forgot1: false,
                forgotpw_ok: action.payload
            }
        case 'FORGOTPW_NO':
            return {
                ...state,
                forgot1: true,
                forgot: false,
                forgotpw_no: action.payload
            }
        case 'SUCCESSPW':
            return {
                ...state,
                successpw: action.payload,
                changed: true
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'RESEP':
            return {
                ...state,
                idResep: action.payload.idresep,
                resepPic: action.payload.image_resep,
                orderNumb: action.payload.order_number,
            }
        case 'RESEP_IMG':
            return {
                ...state,
                resepPic: action.payload
            }
        case 'ADD_DATA':
            return {
                ...state,
                idPayment: action.payload.id_payment_resep
            }
        case 'CART':
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state
    }

}


export default userReducer