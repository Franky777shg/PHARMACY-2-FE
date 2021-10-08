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
    forgot:false,
    profilePic: '',
    forgot1:false,
    successpw:"",
    changed:false,
    role:""
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
                forgot:true,
                forgot1:false,
                forgotpw_ok: action.payload
            }
        case 'FORGOTPW_NO':
            return {
                ...state,
                forgot1:true,
                forgot:false,
                forgotpw_no: action.payload
            }
        case 'SUCCESSPW':
            return{
                ...state,
                successpw: action.payload,
                changed:true
            }
        default:
            return state
    }

}


export default userReducer
