import React from "react";
import axios from 'axios';
import {
    CITIES_LOADING,
    CITIES_SUCCESS,
    CITIES_ERROR
} from "../../constants/actions";
import {API_URL_PROVINCES} from '../../constants/api';


const cities = async () =>{
    const action ={
        type: CITIES_LOADING,
        payload:{}
    }

    await axios.get(`${API_URL_PROVINCES}/p/`)
        .then(data => {
            action.type = CITIES_SUCCESS;
            action.payload = data.data;
        })
        .catch(err => {
            action.type = CITIES_ERROR;
            action.payload = {
                description: "API CITIES ERROR",
                message:err.message
            };
        });

    return action;
}

export {cities};