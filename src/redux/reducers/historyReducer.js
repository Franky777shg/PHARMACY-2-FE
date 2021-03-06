const INITIAL_STATE = {
    history: [],
    ongoing: [],
    pmt:null,
    totalpmt:null
}

const historyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_HISTORY':
            return {
                ...state,
                history: action.payload
            }
        case 'GET_ONGOING':
            return {
                ...state,
                ongoing: action.payload
            }
        case 'UPLOAD_PMT':
            return {
                ...state,
                pmt: action.payload
            }
        case 'TOTAL_PMT':
            return {
                ...state,
                totalpmt: action.payload
            }
        default:
            return state
    }
}

export default historyReducer