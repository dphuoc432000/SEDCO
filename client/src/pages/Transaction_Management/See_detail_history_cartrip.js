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
import { API_IMAGE_URL } from '../../constants/api';
import getEssentials from '../../stores/actions/essentials.action'

class See_detail_history_cartrip extends Component {
    state = {
        essentials: this.props.essentials,
        infor : this.props.infor,
        
    }
    componentDidMount = async () => {
        await this.props.getEssentials();
        const essentialsReducer = this.props.essentialsReducer.essentials;
        const essentials_map= this.state.essentials.map((essential) => {
            const object = {};
            essentialsReducer.find(item => {
                if (item._id === essential.essential_id) {
                    object.quantity = essential.quantity;
                    object.essential_id = essential.essential_id;
                    object.name = item.name;
                    object.unit = item.unit;
                }
                return item._id === essential.essential_id;

            })
            return object;
        })
        this.setState({
            essentials : essentials_map ,
        })
    };
   
    render() {
        let {essentials , infor} = this.state;
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
                                <div className="essentials_infor" style={{ width: '430px', marginTop: '20px' }}>
                                    {/* <h4>Hỗ trợ nhu yếu phẩm</h4> */}
                                    <TableContainer component={Paper} >
                                        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ fontSize: '12px' }} align="left">Nhu yếu</TableCell>
                                                    <TableCell style={{ fontSize: '12px' }} align="center">Đơn vị</TableCell>
                                                    <TableCell style={{ fontSize: '12px' }} align="center">Số lượng</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {essentials.map(essential=>(
                                                    <TableRow
                                                        key={essential.essential_id}
                                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell style={{ fontSize: '12px' }} align="left" component="th" scope="row">{essential.name}</TableCell>
                                                        <TableCell style={{ fontSize: '12px' }} align="center">{essential.unit}</TableCell>
                                                        <TableCell style={{ fontSize: '12px' }} align="center">{essential.quantity}</TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className="contact_infor" style={{ margin: '13px 0 12px 0' }}>
                                    <h4>Thông tin liên hệ</h4>
                                    <table className="contact_content">
                                        <tbody>
                                            <tr>
                                                <td>Họ tên:</td>
                                                <td style={{fontSize : '13px', fontWeight : '400'}}>{infor.full_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Số điện thoại: </td>
                                                <td style={{fontSize : '13px', fontWeight : '400'}}>{infor.phone_number}</td>
                                            </tr>
                                            <tr>
                                                <td>Địa chỉ: </td>
                                                <td style={{fontSize : '13px', fontWeight : '400'}}>{infor.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={DetailHistoryCss.button_container}>
                                <button className={DetailHistoryCss.cancle_button} onClick={() => { this.props.handleShowDetailHistory() }}>Đóng</button>
                                <button className={DetailHistoryCss.cancle_button} style={{ backgroundColor: '#2090ffd4', color: 'white', }}>Nhắn tin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        essentialsReducer: state.essentialsReducer,
        carTripReducer: state.carTripReducer,
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentials: async () => {
            const action = await getEssentials();
            return dispatch(action)
        },


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(See_detail_history_cartrip)