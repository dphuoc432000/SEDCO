import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./notification_content.css";
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
import { confirm_notification_send_to_cartrip_of_sender } from '../../../stores/actions/sender_status.action';
import { toast } from "react-toastify";
import {
    CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_SUCCESS,
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS,
    CREATE_CONVERSATION_SUCCESS
} from '../../../constants/actions';
import {
    get_conversation_by_account_id_receiver_id_action,
    create_conversation_action
} from '../../../stores/actions/conversation.action';
import ReportForm from '../../ReportForm/ReportForm';

class Notification_sender_after_comfirm extends Component {
    state = {
        essentials: [],
        essentials_content: [],
        history_data: this.props.history_data,
        car_infor_data: this.props.car_infor_data,
        showReportForm: false,
    }
    componentDidMount = async () => {
        await this.props.getEssentials();
        const essentialsReducer = this.props.essentialsReducer.essentials;
        const essentials_car = this.props.history_data.essentials;
        const essential_of_sender = this.props.history_data.essentials_current_sender;
        // console.log(essential_of_sender)
        const essentials_map = essential_of_sender.map((essential) => {
            const object = {};
            essentialsReducer.find(item => {
                if (item._id === essential.essential_id) {
                    object.sender_quantity = essential.quantity;
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
                return item.essential_id === essential.essential_id;
            }))
            object.car_quantity = essential.quantity;
            return object;
        })
        this.setState({

            essentials: essentials_content_map,
        })
    };
    componentDidUpdate = async (prevProps) => {
        if (prevProps.history_data !== this.props.history_data || prevProps.car_infor_data !== this.props.car_infor_data) {

            await this.props.getEssentials();
            const essentialsReducer = this.props.essentialsReducer.essentials;
            const essentials_car = this.props.history_data.essentials;
            const essential_of_sender = this.props.history_data.essentials_current_sender;
            // console.log(essential_of_sender)
            const essentials_map = essential_of_sender.map((essential) => {
                const object = {};
                essentialsReducer.find(item => {
                    if (item._id === essential.essential_id) {
                        object.sender_quantity = essential.quantity;
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
                    return item.essential_id === essential.essential_id;
                }))
                object.car_quantity = essential.quantity;
                return object;
            })
            this.setState({
                history_data: this.props.history_data,
                car_infor_data: this.props.car_infor_data,
                essentials: essentials_content_map,
            })
        }

    }
    handleShowMessage = async () => {
        const { account_id, car_infor_data } = this.props;
        const get_conversation_by_account_id_receiver_id_action = await this.props.get_conversation_by_account_id_receiver_id_action(account_id, car_infor_data.status.account_id);
        if (get_conversation_by_account_id_receiver_id_action.type === GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS) {
            const conversation = await this.props.conversationReducer.conversation_account_receiver;
            this.props.handleShowMessageWhenClickConversation(conversation);
        }
        else {
            const create_conversation_action = await this.props.create_conversation_action({ sender_id: account_id, receiver_id: car_infor_data.status.account_id })
            if (create_conversation_action.type === CREATE_CONVERSATION_SUCCESS) {
                const conversation = await this.props.conversationReducer.conversation_account_receiver;
                this.props.handleShowMessageWhenClickConversation(conversation);
            }
        }
    };
    handleShowReportForm = () =>{
        this.setState({
            showReportForm: !this.state.showReportForm
        })
    }
    render() {
        let { essentials, history_data, car_infor_data, showReportForm } = this.state;
        const {status_current, account_id} = this.props;
        const name = car_infor_data.user.full_name;
        const bienso = car_infor_data.status.detail.car.license_plate;
        const trongtai = car_infor_data.status.detail.car.tonnage;
        const note = car_infor_data.status.detail.note;
        const loaixe = car_infor_data.status.detail.car.type_car;
        const songuoi = car_infor_data.status.detail.car.many_people;
        const sdt = car_infor_data.user.phone_number;
        const diachi = car_infor_data.user.address;
        const picture = car_infor_data.status.detail.picture;
        return (
            <div className="content_container">
                <div className="title">
                    <h2>Chi tiết</h2>
                </div>
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
                                                        {essential.sender_quantity >= 0 ? essential.sender_quantity: 0}
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
                                onClick={() => { this.handleShowMessage() }}
                            >
                                Nhắn tin
                            </button>
                        </div>
                    </div>
                </div>
                {
                    showReportForm &&
                    <ReportForm
                        handleShowReportForm={this.handleShowReportForm} 
                        status_current={status_current}
                        account_id={account_id}
                    />
                }
            </div>
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
        confirm_notification_send_to_cartrip_of_sender: async (car_status_id, receiver_status_id) => {
            const action = await confirm_notification_send_to_cartrip_of_sender(car_status_id, receiver_status_id);
            return dispatch(action);
        },
        create_conversation_action: async (object) => {
            const action = await create_conversation_action(object);
            return dispatch(action);
        },
        get_conversation_by_account_id_receiver_id_action: async (account_id, receiver_id) => {
            const action = await get_conversation_by_account_id_receiver_id_action(account_id, receiver_id);
            return dispatch(action);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification_sender_after_comfirm);
