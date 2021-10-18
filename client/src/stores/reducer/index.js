import { combineReducers } from 'redux'
import loginReducer from './loginReducer.js'
import roleReducer from './roleReducer';
import verifyTokenReducer from './verifyTokenReducer.js';
import citiesReducer from './citiesReducer.js';
import districtsReducer from './districtsReducer.js';
import registerReducer from './registerReducer.js';
import userIsLoginReducer from './userIsLoginReducer.js';

export default combineReducers({
    roleReducer,
    loginReducer,
    verifyTokenReducer,
    citiesReducer,
    districtsReducer,
    registerReducer,
    userIsLoginReducer,
});