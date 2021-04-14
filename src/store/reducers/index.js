import {combineReducers} from 'redux'
import auth from './auth'
import currentPage from './currentPage'
import header from './header';


const appReducer = combineReducers({
    auth,
    currentPage,
    header
})

export default (state, action) => {
    if(action.type === 'AUTH_LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
}