import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Receiver_content.css';
import CircleIcon from '@mui/icons-material/Circle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {API_IMAGE_URL} from '../../../../constants/api';


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}
class Receiver_content extends Component {
    render() {
        const receiver_status_information = this.props.receiver_status_information;
        return (
            <div className="content_container">
                <div className="title">
                    <h2>Thông tin</h2>
                </div>
                <div className="content">
                    <div className="status_infor_container">
                        {   !isEmpty(receiver_status_information) ? 
                            <React.Fragment>
                                <div className="per_infor">
                                    <span className="username"><h2 >{receiver_status_information.user.full_name}</h2></span>
                                    <span className="status"><CircleIcon style={{color: '#EA2027'}}/><p style={{color:'#EA2027'}}>Đang đăng ký hỗ trợ</p></span>
                                    <span className="time"><p style={{color: 'rgb(127, 127, 127)'}}>{converJsonDateToDate(receiver_status_information.createdAt)}</p></span>
                                </div>
                                <div className="information_container">
                                    <div className="essentials_infor">
                                        <h4>Cần hỗ trợ</h4>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{fontSize: '12px'}} align="left">Nhu yếu</TableCell>
                                                    <TableCell style={{fontSize: '12px'}} align="right">Đơn vị</TableCell>
                                                    <TableCell style={{fontSize: '12px'}} align="right">Số lượng</TableCell>
                                                    <TableCell style={{fontSize: '12px'}} align="center">Hỗ trợ</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {receiver_status_information.detail.essentials.map(essential =>
                                                    <TableRow
                                                        key={essential.essential_id}
                                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell style={{fontSize: '12px'}} component="th" scope="row">{essential.name}</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="right">{essential.unit}</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="right">{essential.quantity}</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="center">
                                                            <input type="text" name={essential.code_name} id={essential.essential_id} />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                    
                                                }
                                                <TableRow
                                                    // key={row.name}
                                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell style={{fontSize: '12px'}} component="th" scope="row">Số người trong hộ</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="right">Người</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="right">{receiver_status_information.detail.number_per_of_family}</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="center">
                                                            <input type="text" name="" id="" />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                    <div className="contact_infor">
                                        <h4>Thông tin liên hệ</h4>
                                        <table className="contact_content">
                                            <tbody>
                                                <tr>
                                                    <td>Số điện thoại: </td>
                                                    <td>{receiver_status_information.user.phone_number}</td>
                                                </tr>
                                                <tr>
                                                    <td>Địa chỉ: </td>
                                                    <td>{receiver_status_information.user.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="note_infor">
                                        <h4>Ghi chú</h4>
                                        <p className="note_content">
                                            {receiver_status_information.detail.note}
                                        </p>
                                    </div>
                                    <div className="picture_infor">
                                    <h4>Hình ảnh</h4>
                                    <div className="img_content">
                                        <img src={`${API_IMAGE_URL}\\${receiver_status_information.detail.picture}`} alt="" />
                                    </div>
                                </div>
                                </div>
                                
                            </React.Fragment>
                            : <p>Chưa có thông tin</p>
                        }
                    </div>
                    <div className="btn_container">
                    {!isEmpty(receiver_status_information) &&
                        <React.Fragment>
                            <button className="btn_cancel">Hủy</button>
                            <button className="btn_chat">Liên hệ</button>
                            <button className="btn_confirm">Xác nhận</button>
                        </React.Fragment>
                    }
                        
                    </div>
                </div>
            </div>
        )
    }
}

//state này của redux không phải react
const mapStateToProps = (state) =>{
    return {

    }
  }
  
  //dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receiver_content))