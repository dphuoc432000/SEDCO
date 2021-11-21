import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import TableMainSub from "./TableMainSub/TableMainSub";
import SenderEssentialsCss from "../Sender_essentials.module.css";

function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}

class Row extends Component {
    state={
        showTableMainSub: false,
        status: this.props.status
    }
    handleShowTableMainSub = () =>{
        this.setState({
            showTableMainSub: !this.state.showTableMainSub
        })
    }
    render() {
        const {showTableMainSub, status} = this.state;
        return (
            <React.Fragment>
                <tr className={SenderEssentialsCss.table_main_row_data}>
                    <td>{status.account_id}</td>
                    <td>{status._id}</td>
                    <td>{converJsonDateToDate(status.createdAt)}</td>
                    <td>{status.status_completed ?'Đã hoàn thành':'Chưa hoàn Thành'}</td>
                    <td><p className={SenderEssentialsCss.btn_information} onClick={()=>{this.handleShowTableMainSub()}}>{showTableMainSub?'Đóng':'Chi tiết'}</p></td>
                </tr>
                {
                    showTableMainSub &&
                    <tr className={SenderEssentialsCss.table_main_row__table_sub}>
                        <td  colSpan='5'>
                            <TableMainSub status={this.props.status}/>
                        </td>
                    </tr>
                }
                
            </React.Fragment>
        )
    }
}
//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Row))