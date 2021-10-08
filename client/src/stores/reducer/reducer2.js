import React from "react";

const initState = {
    users: [
        {id: 1, name: 'phuoc'}
    ]
}

const reducer2 = (state, action)=>{
    state = initState
    return state;
}

export default reducer2;