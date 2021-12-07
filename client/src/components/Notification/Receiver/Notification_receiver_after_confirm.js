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
import {API_IMAGE_URL} from '../../../constants/api';
import getEssentials from '../../../stores/actions/essentials.action';
import {confirm_notification_send_to_cartrip_of_receiver} from '../../../stores/actions/receiver_status.action';
import { toast } from "react-toastify";
import {CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_SUCCESS} from '../../../constants/actions'
class Notification_receiver_after_comfirm extends Component {
    state = {
        essentials : [],
        essentials_content : [],
        history_data : this.props.history_data ,
        car_infor_data : this.props.car_infor_data ,
    }
    componentDidMount = async () => {
        await this.props.getEssentials();
        const essentialsReducer = this.props.essentialsReducer.essentials;
        const essentials_car = this.props.history_data.essentials;
        const essential_of_receiver = this.props.history_data.essentials_current_receiver;
        console.log(essential_of_receiver)
        const essentials_map = essential_of_receiver.map((essential) =>{
            const object = {};
            essentialsReducer.find(item => {
                if(item._id === essential.essential_id ){
                    object.receiver_quantity = essential.quantity;
                    object.essential_id = essential.essential_id;
                    object.name = item.name;
                    object.unit = item.unit;
                }
                return item._id === essential.essential_id;
                
            })
            return object;
        })

        let essentials_content_map = essentials_map.map( item => {
            const object = item;
            const essential = ( essentials_car.find(essential => {
                return item.essential_id === essential.essential_id;
            }))
            object.car_quantity = essential.quantity;
            return object;
        })
        this.setState({
            essentials: essentials_content_map ,
        })
    };
    componentDidUpdate = async(prevProps) => {
        if(prevProps.history_data !== this.props.history_data || prevProps.car_infor_data !== this.props.car_infor_data){
                
            await this.props.getEssentials();
            const essentialsReducer = this.props.essentialsReducer.essentials;
            const essentials_car = this.props.history_data.essentials;
            const essential_of_receiver = this.props.history_data.essentials_current_receiver;
            console.log(essential_of_receiver)
            const essentials_map = essential_of_receiver.map((essential) =>{
                const object = {};
                essentialsReducer.find(item => {
                    if(item._id === essential.essential_id ){
                        object.receiver_quantity = essential.quantity;
                        object.essential_id = essential.essential_id;
                        object.name = item.name;
                        object.unit = item.unit;
                    }
                    return item._id === essential.essential_id;
                    
                })
                return object;
            })

            let essentials_content_map = essentials_map.map( item => {
                const object = item;
                const essential = ( essentials_car.find(essential => {
                    return item.essential_id === essential.essential_id;
                }))
                object.car_quantity = essential.quantity;
                return object;
            })
            this.setState({
                history_data : this.props.history_data,
                car_infor_data : this.props.car_infor_data,
                essentials: essentials_content_map ,
            })
        }

    }
    
  render() {
    let {essentials , history_data , car_infor_data  } = this.state;
    // console.log(essentials)
    // console.log(this.props.history_data);
    // console.log(this.props.car_infor_data);
    const name = car_infor_data.user.full_name;
    const bienso = car_infor_data.status.detail.car.license_plate;
    const trongtai = car_infor_data.status.detail.car.tonnage;
    const note =  car_infor_data.status.detail.note;
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
                <p style={{ color: "red" }}>Báo cáo sai phạm</p>
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
                    {essentials && essentials.map( essential => {
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
                            {essential.receiver_quantity}
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
                        <button className="btn-notifi_detail btn_detail-chat">
                            Nhắn tin
                        </button>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        essentialsReducer : state.essentialsReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentials: async () => {
            const action = await getEssentials();
            return dispatch(action);
        },
        confirm_notification_send_to_cartrip_of_receiver : async (car_status_id ,receiver_status_id) => {
            const action = await confirm_notification_send_to_cartrip_of_receiver(car_status_id ,receiver_status_id);
            return dispatch(action);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification_receiver_after_comfirm);