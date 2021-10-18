const INITIAL_STATE = {
    history: []
}

const historyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_HISTORY':
            return {
                history: action.payload
            }
        default:
            return state
    }
}

export default historyReducer