import React from "react";
import axios from 'axios';
import {
    ROLE_USER,
    ROLE_USER_ERROR
} from "../../constants/actions";
import {API_URL} from '../../constants/api';

const get_role_user = async (role_id) =>{
    const action ={
        type: ROLE_USER,
        payload:{}
    }

    await axios.get(`${API_URL}/api/role/${role_id}/detail`)
        .then(data => {
            action.payload = data.data;
        })
        .catch(err => {
            action.type = ROLE_USER_ERROR;
            action.payload = {
                description: "ROLE_USER không xác định",
                message:err.message
            };
        });

    return action;
}

export {get_role_user};