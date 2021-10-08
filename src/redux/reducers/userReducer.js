const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    email: "",
    failedLogin: false,
    msgFailedLogin: "",
    forgotpw_ok: "",
    forgotpw_no: "",
    forgot:false,
    profilePic: ''
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
                profilePic: action.payload.profile_pic
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
                forgotpw_ok: action.payload
            }
        case 'FORGOTPW_NO':
            return {
                ...state,
                forgot:true,
                forgotpw_no: action.payload
            }
        default:
            return state
    }

}


export default userReducer
