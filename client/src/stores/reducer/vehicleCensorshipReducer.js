import React from "react";
import {
    VEHICLE_CENSORSHIP_ERROR,
    VEHICLE_CENSORSHIP_SUCCESS
} from "../../constants/actions";

const initState = {}

const vehicleCensorshipReducer = (state, action)=>{
    state = initState;
    switch(action.type){
        case VEHICLE_CENSORSHIP_SUCCESS:
            const vehicleCensorship = action.payload;
            return {...state,...vehicleCensorship}
        case VEHICLE_CENSORSHIP_ERROR:
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default vehicleCensorshipReducer;