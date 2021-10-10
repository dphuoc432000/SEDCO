import React from "react";
import {
    CITIES_SUCCESS,
    CITIES_ERROR
} from "../../constants/actions";


const initState = {
    cities:[]
}

const citiesReducer = (state, action)=>{
    state = initState;
    switch(action.type){
        case CITIES_SUCCESS:
            console.log('cities success')
            const cities = action.payload;
            // console.log( cities)
            return {...state,cities:[...cities]}
        case CITIES_ERROR:
            console.log('error')
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default citiesReducer;