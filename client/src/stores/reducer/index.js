import { combineReducers } from 'redux'
import rootReducer from './rootReducer.js'
import reducer2 from './reducer2';



export default combineReducers({
    reducer2,
    rootReducer
});