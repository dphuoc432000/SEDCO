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
import {toast } from 'react-toastify';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';
import {confirm_receiver_status_of_car_action, cancle_register_receiver_action} from '../../../../stores/actions/car_regis_status';
import {
    CONFIRM_RECEIVER_STATUS_OF_CAR_SUCCESS, CANCEL_REGISTER_RECEIVER_FOR_CAR_SUCCESS,
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS,
    CREATE_CONVERSATION_SUCCESS,
} from '../../../../constants/actions';
import ReportForm from "../../../../components/ReportForm/ReportForm";
import {
    create_conversation_action,
    get_conversation_by_account_id_receiver_id_action
} from '../../../../stores/actions/conversation.action';


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
    state = {
        receiver_status_information:{},
        essentials:{},
        essentials_car:{},
        open_ModalConfirm: false,
        showReportForm: false,
    }
    modifiedEssentailToEssentialsCar = (essentials) =>{
        const essentials_object = {}
        essentials.map(essential=>{
            essentials_object[essential.code_name] = {
                ...essential,
                quantity: 0
            }
            return {
                ...essential,
                quantity: 0
            }
        });
        return essentials_object;
    }
    componentDidMount = async () =>{
        if(!isEmpty(this.props.receiver_status_information)){
            const essentials = this.props.receiver_status_information.detail.essentials;
            this.setState({
                receiver_status_information: this.props.receiver_status_information,
                essentials: essentials,
                essentials_car: {...this.modifiedEssentailToEssentialsCar(essentials)}
            })
        }
    }
    componentDidUpdate = (prevProps) =>{
        if(this.props.receiver_status_information !== prevProps.receiver_status_information){
            if(!isEmpty(this.props.receiver_status_information)){
                const essentials = this.props.receiver_status_information.detail.essentials;
                this.setState({
                    receiver_status_information: this.props.receiver_status_information,
                    essentials: essentials,
                    essentials_car: {...this.modifiedEssentailToEssentialsCar(essentials)}
                })
            }
            else
                this.setState({
                    receiver_status_information: {},
                    essentials: [],
                    essentials_car: {}
                })  
        }
    }
    checkInput = (value) =>{
        const regex = /^[0-9]*$/
        if(regex.test(value))
            return true;
        return false;
    }
    keyispressed = (e) =>{
        var charValue= String.fromCharCode(e.keyCode);
        if((isNaN(charValue)) && (e.which !== 8 ) || (e.which === 32)){ // BSP KB code is 8
            e.preventDefault();
        }
        return true;
    }
    handChangeInputQuantityEssential_Car = (event) =>{
        let value = event.target.value;
        const name = event.target.name;
        value = value===''?0:value;
        if(this.checkInput(value)){
            this.setState({
                essentials_car: {
                    ...this.state.essentials_car,
                    [name]:{
                        ...this.state.essentials_car[name],
                        quantity: parseInt(value)
                    }
                }
            })
        }
    }
    checkingForm = () =>{
        const essentials_car = this.state.essentials_car;
        for(let [key, value] of Object.entries(essentials_car)){
            if(value.quantity > 0)
                return true;
        }
        return false
    }
    convertEssentialCarObjectToArray = (essentials_car) =>{
        const essentials = []
        for(let [key, value] of Object.entries(essentials_car)){
            essentials.push({
                essential_id: value.essential_id,
                quantity: value.quantity
            });
        }
        return essentials;
    }
    //kiểm tra số lượng hiện có trong chuyến xe
    //Nếu có essential với số lượng trên xe hiện tại < số lượng cho. Thì trả về true. Ngược lại >= false
    checkQuantityInCarStatus = (car_status, essentials_support) =>{
        const essentials_car = car_status.detail.essentials;
        return essentials_support.some(essential =>{
            const ess = essentials_car.find(ess =>{
                return ess.essential_id === essential.essential_id
            })
            return ess.quantity < essential.quantity
        })
    }
    handleCarConfirm = async (receiver_status) =>{
        if(this.checkingForm()){
            const essentials = this.convertEssentialCarObjectToArray(this.state.essentials_car);
            const car_status_id = this.props.car_status.detail._id;
            const receiver_status_id = this.state.receiver_status_information.detail._id;
            const checkQuantityInCarStatus = this.checkQuantityInCarStatus(this.props.car_status, essentials);
            const confirm_receiver_status_of_car_action = await this.props.confirm_receiver_status_of_car_action(car_status_id, receiver_status_id, {essentials})
            if(!checkQuantityInCarStatus){
                if(confirm_receiver_status_of_car_action.type === CONFIRM_RECEIVER_STATUS_OF_CAR_SUCCESS){
                    toast.success('Xác nhận đã nhận nhu yếu phẩm!');
                    this.props.handleRemoveStatusAfterCorfirmOrCancle_receiver_list(receiver_status);
                    this.props.handleChangeQuantityCarAfterConfirm();
                    this.props.handleUpdateStatusCurrent()
                }
                else{
                    toast.error('Đã xãy ra lỗi trong quá trình xác thực!');
                }
            
            }else
                toast.warn('Không đủ số lượng. Vui lòng kiểm tra số lượng!');
        }
        else
            toast.warn('Vui lòng nhập số lượng nhận!');
    }
    handleCancleStatus = async (receiver_status) =>{
        const car_status_id = this.props.car_status.detail._id;
        const receiver_status_id = this.state.receiver_status_information.detail._id;
        const cancle_register_receiver_action = await this.props.cancle_register_receiver_action(car_status_id,receiver_status_id);
        if(cancle_register_receiver_action.type === CANCEL_REGISTER_RECEIVER_FOR_CAR_SUCCESS){
            this.props.handleRemoveStatusAfterCorfirmOrCancle_receiver_list(receiver_status);
            toast.success('Đã hủy đăng ký hỗ trợ nhu yếu phẩm!')
        }
        else
            toast.error('Đã xảy ra lỗi trong quá trình hủy!')
    }
    handleOpenModalConfirm = () =>{
        this.setState({
            open_ModalConfirm: !this.state.open_ModalConfirm
        })
    }
    handleShowReportForm = () =>{
        this.setState({
            showReportForm: !this.state.showReportForm,
        })
    }
    handleShowMessage = async () => {
        const {account_id} = this.props;
        const {receiver_status_information} = this.state;
        const get_conversation_by_account_id_receiver_id_action = await this.props.get_conversation_by_account_id_receiver_id_action(account_id, receiver_status_information.account_id);
        if(get_conversation_by_account_id_receiver_id_action.type === GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS){
            const conversation = await this.props.conversationReducer.conversation_account_receiver;
            this.props.handleShowMessageWhenClickConversation(conversation);
        }
        else{
            const create_conversation_action = await this.props.create_conversation_action({sender_id: account_id,receiver_id: receiver_status_information.account_id} )
            if(create_conversation_action.type === CREATE_CONVERSATION_SUCCESS){
                const conversation = await this.props.conversationReducer.conversation_account_receiver;
                this.props.handleShowMessageWhenClickConversation(conversation);
            }
        }
    };
    render() {
        const {receiver_status_information, essentials, essentials_car, open_ModalConfirm} = this.state;
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
                                    <span className="report" onClick={() =>{this.handleShowReportForm()}}><p>Báo cáo sai phạm</p></span>
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
                                                {essentials.map(essential =>
                                                    <TableRow
                                                        key={essential.essential_id}
                                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell style={{fontSize: '12px'}} component="th" scope="row">{essential.name}</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="right">{essential.unit}</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="right">{essential.quantity >= 0 ? essential.quantity : 0 }</TableCell>
                                                        <TableCell style={{fontSize: '12px'}} align="center">
                                                            <input 
                                                                type="text" 
                                                                name={essential.code_name} 
                                                                id={essential.essential_id} 
                                                                placeholder={0}
                                                                onKeyDown={event => this.keyispressed(event)}
                                                                onChange={(event)=>{this.handChangeInputQuantityEssential_Car(event)}} 
                                                            />
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
                                                    <TableCell style={{fontSize: '12px'}} align="center"></TableCell>
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
                            <button onClick={()=>{this.handleOpenModalConfirm()}} className="btn_cancel">Hủy</button>
                            <button className="btn_chat" onClick={()=>{this.handleShowMessage()}}>Nhắn tin</button>
                            <button onClick={()=>{this.handleCarConfirm(receiver_status_information)}} className="btn_confirm">Xác nhận</button>
                        </React.Fragment>
                    }
                        
                    </div>
                </div>
                {
                    open_ModalConfirm &&
                        <ModalConfirm 
                            open={open_ModalConfirm} 
                            status_information={receiver_status_information}  
                            content={'Bạn muốn hủy hỗ trợ nhu yếu phẩm đến người dùng này?'}
                            handleCancleStatus={this.handleCancleStatus}
                            handleOpenModalConfirm={this.handleOpenModalConfirm}
                        />
                }
                {
                    this.state.showReportForm &&
                    <ReportForm 
                        handleShowReportForm={this.handleShowReportForm} 
                        status_current={receiver_status_information}
                        account_id={this.props.account_id}
                    />
                }
            </div>
        )
    }
}

//state này của redux không phải react
const mapStateToProps = (state) =>{
    return {
        conversationReducer: state.conversationReducer,
    }
  }
  
  //dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        confirm_receiver_status_of_car_action: async(car_status_id, receiver_status_id, object) =>{
            const action = await confirm_receiver_status_of_car_action(car_status_id, receiver_status_id, object);
            return dispatch(action);
        },
        cancle_register_receiver_action: async(car_status_id, receiver_status_id) =>{
            const action = await cancle_register_receiver_action(car_status_id, receiver_status_id);
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receiver_content))