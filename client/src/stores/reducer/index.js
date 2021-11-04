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
import statusListReducer from './status_listReducer'
import senderStatusListReducer from './sender_status_listReducer';
import receiverStatusListReducer from './receiver_status_listReducer';
import car_tripStatusListReducer from './car_trip_status_listReducer';

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
    statusListReducer,
    senderStatusListReducer,
    receiverStatusListReducer,
    car_tripStatusListReducer,
});