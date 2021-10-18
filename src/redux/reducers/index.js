import {combineReducers} from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import historyReducer from './historyReducer'

export default combineReducers ({
    userReducer,
    productReducer,
    historyReducer
})