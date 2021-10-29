import React from "react";
import axios from 'axios';
import {
    VEHICLE_CENSORSHIP_SUCCESS,
    VEHICLE_CENSORSHIP_LOADING,
    VEHICLE_CENSORSHIP_ERROR
} from "../../constants/actions";
import {API_URL} from '../../constants/api';

const getVehicleCensorship_forUser = async(user_id)=>{
    const action ={
        type:VEHICLE_CENSORSHIP_LOADING,
        payload:{}
    } 

    const api_get_vehicle_censorship = `${API_URL}/api/vehicle_censorship/user_id/${user_id}/detail`
    await axios.get(api_get_vehicle_censorship)
        .then(res =>{
            action.type = VEHICLE_CENSORSHIP_SUCCESS
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = VEHICLE_CENSORSHIP_ERROR
            action.payload = {
                description: "API VEHICLE_CENSORSHIP ERROR",
                message:err.message,
                errdata: err.response.data
            };
        })
    return action;
}

export {getVehicleCensorship_forUser};