import React, { Component } from 'react';
import './History.css'
import See_detail_history_cartrip from './See_detail_history_cartrip'
class History_cartrip extends Component {
    state = {
        see_detail_history : false ,
    }
    handleShowDetailHistory = () => {
        this.setState({
            see_detail_history : !this.state.see_detail_history ,
        })
    }
    render() {
        let {see_detail_history} = this.state;
        const checkSeeDetailHistory = see_detail_history === true ?
             <See_detail_history_cartrip
                handleShowDetailHistory = {this.handleShowDetailHistory}
             /> 
             : "";
        return (
            <div className="History_block--left">
                <div className="QLGD-History">
                    <ul className="QLGD-History__List">
                        <li onClick={() => {this.handleShowDetailHistory()}} className="QLGD-History__Item" >
                            <div style={{display: 'flex'}}>
                                Đã xác nhận nhận nhu yếu phẩm của
                                <h3 style={{fontWeight: '500'}}>Hà Đức Phước</h3>
                            </div>
                            <div style={{marginLeft: '40px'}}>
                                <h3 >Đã xác nhận</h3>
                            </div>
                            
                        </li>
                        
                        
                    </ul>
                </div>
                {checkSeeDetailHistory}
            </div>
           

        );
    }
}


export default History_cartrip;