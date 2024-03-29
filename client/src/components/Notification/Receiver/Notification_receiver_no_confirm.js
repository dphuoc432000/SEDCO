import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./notification_content_receiver.css";
import CircleIcon from "@mui/icons-material/Circle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { API_IMAGE_URL } from '../../../constants/api';
import getEssentials from '../../../stores/actions/essentials.action';
import { confirm_notification_send_to_cartrip_of_receiver } from '../../../stores/actions/receiver_status.action';
import { toast } from "react-toastify";
import { 
    CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_SUCCESS,
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS,
    CREATE_CONVERSATION_SUCCESS
} from '../../../constants/actions';
import {
    get_conversation_by_account_id_receiver_id_action,
    create_conversation_action
} from '../../../stores/actions/conversation.action';
import ReportForm from '../../ReportForm/ReportForm';

class Notification_receiver_no_comfirm extends Component {
    state = {
        essentials: [],
        essentials_content: [],
        showReportForm: false
    }
    componentDidMount = async () => {
        await this.props.getEssentials();
        const essentialsReducer = this.props.essentialsReducer.essentials;
        const essentials_car = this.props.history_data.essentials;
        const essential_of_receiver = this.props.history_data.essentials_current_receiver;
        console.log(essential_of_receiver)
        const essentials_map = essential_of_receiver.map((essential) => {
            const object = {};
            essentialsReducer.find(item => {
                if (item._id === essential.essential_id) {
                    object.receiver_quantity = essential.quantity;
                    object.essential_id = essential.essential_id;
                    object.name = item.name;
                    object.unit = item.unit;
                }
                return item._id === essential.essential_id;

            })
            return object;
        })

        let essentials_content_map = essentials_map.map(item => {
            const object = item;
            const essential = (essentials_car.find(essential => {

                // console.log(item.essential_id , essential.essential_id);

                // if(item.essential_id === essential.essential_id){
                //     object.essential_id =item.essential_id;
                //     object.name = item.name;
                //     object.car_quantity = essential.quantity;
                // }
                // else{
                //     object.essential_id =item.essential_id;
                //     object.name = item.name;
                //     object.car_quantity = 0;
                // }
                return item.essential_id === essential.essential_id;
            }))
            object.car_quantity = essential.quantity;
            return object;
        })

        // essentials_content_map = essentials_content_map.map( item => {
        //     const object = {...item};
        //     essential_of_sender.find(essential => {
        //         if(item.essential_id === essential.essential_id){
        //             object.sender_quantity = essential.quantity;
        //         }else{
        //             object.sender_quantity = essential.quantity;
        //         }
        //         return essential;
        //     })
        //     return object;
        // })
        // console.log(essentials_content_map)

        this.setState({
            essentials: essentials_content_map,

        })
    };

    handleConfirmNotification = async () => {
        const confirm_action = await this.props.confirm_notification_send_to_cartrip_of_receiver(
            this.props.history_data.car_status_id,
            this.props.history_data.receiver_status_id,
        )
        if (confirm_action.type !== CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_SUCCESS)
            toast.error("Xác nhận không thành công!");
        else {
            this.props.handleUpdateNotifiWhenConfirm();
            this.props.handleLoadAgainWhenCreateStatus();
            toast.success("Xác nhận thành công!");
        }
    }
    handleShowMessage = async () => {
        const {account_id, car_infor_data} = this.props;
        const get_conversation_by_account_id_receiver_id_action = await this.props.get_conversation_by_account_id_receiver_id_action(account_id, car_infor_data.status.account_id);
        if(get_conversation_by_account_id_receiver_id_action.type === GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS){
            const conversation = await this.props.conversationReducer.conversation_account_receiver;
            this.props.handleShowMessageWhenClickConversation(conversation);
        }
        else{
            const create_conversation_action = await this.props.create_conversation_action({sender_id: account_id,receiver_id: car_infor_data.status.account_id} )
            if(create_conversation_action.type === CREATE_CONVERSATION_SUCCESS){
                const conversation = await this.props.conversationReducer.conversation_account_receiver;
                this.props.handleShowMessageWhenClickConversation(conversation);
            }
        }
    };
    handleShowReportForm = ()=>{
        this.setState({
            showReportForm: !this.state.showReportForm
        })
    }
    render() {
        let { essentials, showReportForm } = this.state;
        const {account_id, status_current, car_infor_data} = this.props;
        const {user, status} = car_infor_data;
        const name = user.full_name;
        const bienso = status.detail.car.license_plate;
        const trongtai = status.detail.car.tonnage;
        const note = status.detail.note;
        const loaixe = status.detail.car.type_car;
        const songuoi = status.detail.car.many_people;
        const sdt = user.phone_number;
        const diachi = user.address;
        const picture = status.detail.picture;
        return (
            <React.Fragment>
                <div className="content">
                    <div className="status_infor_container">
                        <div className="per_infor">
                            <span className="username">
                                <h2>{name}</h2>
                            </span>
                            <span className="status" style={{ color: "#009432" }}>
                                <CircleIcon />
                                <p>Đang vận chuyển</p>
                            </span>
                            <span className="time">
                                <p style={{ color: "red", cursor: 'pointer' }} onClick={() => {this.handleShowReportForm()}}>Báo cáo sai phạm</p>
                            </span>
                        </div>
                        <div className="essentials_infor">
                            <h4>Đã nhận</h4>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "12px" }} align="left">
                                                Nhu yếu
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px" }} align="center">
                                                Đơn vị
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px" }} align="center">
                                                Số lượng
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px" }} align="center">
                                                Chuyến xe
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {essentials && essentials.map(essential => {
                                            return (

                                                <TableRow
                                                    // key={row.name}
                                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    key={essential.essential_id}
                                                >

                                                    <TableCell
                                                        style={{ fontSize: "12px" }}
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {essential.name}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "12px" }} align="center">
                                                        {essential.unit}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "12px" }} align="center">
                                                        {essential.receiver_quantity >= 0 ? essential.receiver_quantity : 0}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "12px" }} align="center">
                                                        {essential.car_quantity}
                                                    </TableCell>
                                                </TableRow>
                                            )

                                        })}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className="contact_infor">
                            <h4>Thông tin liên hệ</h4>
                            <table className="contact_content">
                                <tr>
                                    <td>Biển số: </td>
                                    <td>{bienso}</td>
                                </tr>
                                <tr>
                                    <td>Loại xe: </td>
                                    <td>{loaixe}</td>
                                </tr>
                                <tr>
                                    <td>Trọng tải: </td>
                                    <td>{trongtai}</td>
                                </tr>
                                <tr>
                                    <td>Số người:</td>
                                    <td>{songuoi}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại: </td>
                                    <td>{sdt}</td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ: </td>
                                    <td>{diachi}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="note_infor">
                            <h4>Ghi chú</h4>
                            <p className="note_content">{note}</p>
                        </div>
                        <div className="picture_infor">
                            <h4>Hình ảnh</h4>
                            <div className="img_content">
                                <img src={`${API_IMAGE_URL}/${picture}`} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="btn_container" style={{ display: "flex" }}>
                        <div>
                            <button className="btn-notifi_detail btn_detail-chat"
                                onClick={()=>{this.handleShowMessage()}}
                            >
                                Nhắn tin
                            </button>
                        </div>
                        <div>
                            <button className="btn-notifi_detail btn_detail-confirm"
                                onClick={() => { this.handleConfirmNotification() }}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
                {showReportForm &&
                    <ReportForm
                        handleShowReportForm={this.handleShowReportForm} 
                        status_current={status_current}
                        account_id={account_id}
                    />
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        essentialsReducer: state.essentialsReducer,
        conversationReducer: state.conversationReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentials: async () => {
            const action = await getEssentials();
            return dispatch(action);
        },
        confirm_notification_send_to_cartrip_of_receiver: async (car_status_id, receiver_status_id) => {
            const action = await confirm_notification_send_to_cartrip_of_receiver(car_status_id, receiver_status_id);
            return dispatch(action);
        },
        create_conversation_action: async(object) =>{
          const action = await create_conversation_action(object);
          return dispatch(action);
        },
        get_conversation_by_account_id_receiver_id_action: async(account_id, receiver_id) =>{
            const action = await get_conversation_by_account_id_receiver_id_action(account_id, receiver_id);
            return dispatch(action);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification_receiver_no_comfirm);
