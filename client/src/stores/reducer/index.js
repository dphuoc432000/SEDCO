import { combineReducers } from 'redux'
import loginReducer from './loginReducer.js'
import roleReducer from './roleReducer';
import verifyTokenReducer from './verifyTokenReducer.js';
import citiesReducer from './citiesReducer.js';
import districtsReducer from './districtsReducer.js';
import registerReducer from './registerReducer.js';
import userIsLoginReducer from './userIsLoginReducer.js';
import forgotPasswordReducer from './forgotPasswordReducer.js';
import changePasswordReducer from './changePasswordReducer.js';
import vehicleCensorshipReducer from './vehicleCensorshipReducer';
import receiverFormReducer from './receiverFormReducer.js';
import essentialsReducer from './essentialsReducer.js';
import statusCurrentReducer from './StatusCurrentReducer.js';
import essentialsDetailReducer from './essentialsDetailReducer.js';
import updateStatusReceiverReducer from './updateStatusReceiverReducer';

export default combineReducers({
    roleReducer,
    loginReducer,
    verifyTokenReducer,
    citiesReducer,
    districtsReducer,
    registerReducer,
    userIsLoginReducer,
    forgotPasswordReducer,
    changePasswordReducer,
    vehicleCensorshipReducer,
    receiverFormReducer,
    essentialsReducer,
    statusCurrentReducer,
    essentialsDetailReducer,
    updateStatusReceiverReducer
});