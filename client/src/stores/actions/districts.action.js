import React from "react";
import axios from 'axios';
import {
    DISTRICT_LOADING,
    DISTRICT_SUCCESS,
    DISTRICT_ERROR
} from "../../constants/actions";
import {API_URL_PROVINCES} from '../../constants/api';


const districts = async (province_code) =>{
    const action ={
        type: DISTRICT_LOADING,
        payload:{}
    }
    if(province_code && province_code >= 0)
        await axios.get(`${API_URL_PROVINCES}/p/${province_code}?depth=2`)
            .then(data => {
                action.type = DISTRICT_SUCCESS;
                action.payload = data.data.districts;
                // console.log(action.payload )
            })
            .catch(err => {
                action.type = DISTRICT_ERROR;
                action.payload = {
                    description: "API DISTRICTS ERROR",
                    message:err.message
                };
            });
    else{
        action.type = DISTRICT_ERROR;
        action.payload = {
            description: "province_code không hợp lệ ",
        };
    }
    return action;
}

export {districts};