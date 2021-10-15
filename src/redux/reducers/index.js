import {combineReducers} from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import paymentReducer from './paymentReducer'

export default combineReducers ({
    userReducer,
    productReducer,
    paymentReducer
})