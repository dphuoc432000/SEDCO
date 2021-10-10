import React from "react";
import {
    DISTRICT_SUCCESS,
    DISTRICT_ERROR
} from "../../constants/actions";


const initState = {
    districts:[]
}

const districtsReducer = (state, action)=>{
    state = initState;
    switch(action.type){
        case DISTRICT_SUCCESS:
            console.log('districts success')
            const districts = action.payload;
            // console.log( districts)
            return {...state, districts}
        case DISTRICT_ERROR:
            console.log('error')
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default districtsReducer;