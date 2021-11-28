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
import statusListNoCompeletedReducer from './status_list_no_completedReducer'
import senderStatusListNoCompletedReducer from './sender_status_list_no_completedReducer';
import receiverStatusListNoCompletedReducer from './receiver_status_list_no_completedReducer';
import car_tripStatusListNoCompletedReducer from './car_trip_status_list_no_completedReducer';
import statusCurrentReducer from './StatusCurrentReducer.js';
import essentialsDetailReducer from './essentialsDetailReducer.js';
import updateStatusReceiverReducer from './updateStatusReceiverReducer';
import cartripFormReducer from './createStatusCarTripReducer'
import updateStatusCartripReducer from './updateStatusCarTripReducer';
import carRegisStatusReducer from './carRegisStatusReducer';
import recentStatusReducer from './recentStatusReducer.js';
import statusListReducer from './statusListReducer';
import user_list_no_censorshipReducer from './user_list_no_censorshipReducer';
import accountReducer from './accountReducer.js';
import userReducer from './userReducer';
import reportListReducer from './reportListReducer.js';
import carTripReducer from './carTripReducer.js';
import sender_statusReducer from './sender_statusReducer'
import receiver_statusReducer from './receiver_statusReducer'
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
    statusListNoCompeletedReducer,
    senderStatusListNoCompletedReducer,
    receiverStatusListNoCompletedReducer,
    car_tripStatusListNoCompletedReducer,
    statusCurrentReducer,
    essentialsDetailReducer,
    updateStatusReceiverReducer,
    cartripFormReducer,
    updateStatusCartripReducer,
    carRegisStatusReducer,
    recentStatusReducer,
    statusListReducer,
    user_list_no_censorshipReducer,
    accountReducer,
    userReducer,
    reportListReducer,
    carTripReducer,
    sender_statusReducer,
    receiver_statusReducer,
});