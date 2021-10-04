const INITIAL_STATE = {
    id:null,
    username: "",
    password: "",
    email: "",
    failedLogin: false,
    msgFailedLogin: ""
}

const userReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                id: action.payload.iduser,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                profilePic: action.payload.profile_pic
            }
        case 'FAILED_LOGIN':
            return{
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
        default:
            return state
    }
    
}

export default userReducer