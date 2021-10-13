import React, { Component } from 'react'
import SenderForm from '../../CreateStatusForm/SenderForm';


export default class Status extends Component {
    showForm = (event) =>{
        const type_button = event.target.id;
        this.props.showForm(type_button);
    }


    render() {
        return (
            <div className="status_container">
                <button id="btn_car_trip" onClick={(event)=>{this.showForm(event)}}>Người vận chuyển</button>
                <button id="btn_support" onClick={(event)=>{this.showForm(event)}}>Người hỗ trợ</button>
                <button id="btn_need_support" onClick={(event)=>{this.showForm(event)}}>Người cần hỗ trợ</button>
            </div>
        )
    }
}
