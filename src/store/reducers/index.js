import {combineReducers} from 'redux'
import auth from './auth'
import currentPage from './currentPage'

export default combineReducers({
    auth,
    currentPage
})