import React, { Component } from 'react';
import DetailHistoryCss from './DetailHistory.module.css'
import CircleIcon from '@mui/icons-material/Circle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import {API_IMAGE_URL} from '../../constants/api';
import getEssentials from '../../stores/actions/essentials.action'
class See_detail_history_cartrip extends Component {
    state = {
        essentials: [],
    }
    render() {
        
        return (
            <div className={DetailHistoryCss.report_container}>
                <div className={DetailHistoryCss.layer_container}>
                    <div className={DetailHistoryCss.form_layer} >
                        <div className={DetailHistoryCss.background_layer} onClick={() => { this.props.handleShowDetailHistory() }}></div>
                        <div className={DetailHistoryCss.form_container}>
                            <div className={DetailHistoryCss.title_container}>
                                <h3>Lịch sử giao dịch</h3>
                            </div>
                            <div className="information_container">
                                <div className="essentials_infor" style={{width : '375px' , marginTop : '18px'}}>
                                    {/* <h4>Hỗ trợ nhu yếu phẩm</h4> */}
                                    <TableContainer component={Paper} >
                                        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ fontSize: '12px' }} align="left">Nhu yếu</TableCell>
                                                    <TableCell style={{ fontSize: '12px' }} align="right">Đơn vị</TableCell>
                                                    <TableCell style={{ fontSize: '12px' }} align="right">Số lượng</TableCell>
                                                 
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              
                                                    <TableRow
                                                     
                                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell style={{ fontSize: '12px' }} component="th" scope="row"></TableCell>
                                                        <TableCell style={{ fontSize: '12px' }} align="right"></TableCell>
                                                        <TableCell style={{ fontSize: '12px' }} align="right"></TableCell>
                                                       
                                                    </TableRow>
                                               
                                                <TableRow
                                                // key={row.name}
                                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell style={{ fontSize: '12px' }} component="th" scope="row">Tổng khối lượng</TableCell>
                                                    <TableCell style={{ fontSize: '12px' }} align="right">Kg</TableCell>
                                                    <TableCell style={{ fontSize: '12px' }} align="right"></TableCell>
                                                    <TableCell style={{ fontSize: '12px' }} align="center"></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className="contact_infor" style={{marginTop:'10px'}}>
                                    <h4>Thông tin liên hệ</h4>
                                    <table className="contact_content">
                                        <tbody>
                                            <tr>
                                                <td>Họ tên:</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Số điện thoại: </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Địa chỉ: </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="note_infor">
                                    <h4>Ghi chú</h4>
                                    <p className="note_content">
                                        
                                    </p>
                                </div>
                                <div className="picture_infor">
                                    <h4>Hình ảnh</h4>
                                    <div className="img_content">
                                        {/* <img src={`${API_IMAGE_URL}\\${sender_status_information.detail.picture}`} alt="" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className={DetailHistoryCss.button_container}>
                                <button className={DetailHistoryCss.cancle_button} onClick={() => { this.props.handleShowDetailHistory() }}>Đóng</button>
                                <button className={DetailHistoryCss.cancle_button}  style={{backgroundColor: '#2090ffd4',color: 'white',}}>Nhắn tin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        essentialsReducer: state.essentialsReducer,
       
    }
  }
  
  //dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        getEssentials: async() =>{
            const action = await getEssentials();
            return dispatch(action)
        },
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(See_detail_history_cartrip)