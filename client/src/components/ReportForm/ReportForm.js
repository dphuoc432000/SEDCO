import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReportFormCss from './ReportForm.module.css';
import { FormError } from '../../components/FormError/FormError';
import {toast } from 'react-toastify';
import{CREATE_REPORT_SUCCESS} from '../../constants/actions';
import {create_report_action} from '../../stores/actions/report.action';

class ReportForm extends Component {
    state ={
        report:{
            value:'',
            isInputValue: false,
            errorMessage:''
        }
    }
    checkingForm =() =>{
        const dataForm = [...Object.values(this.state)];
        return dataForm.some((item)=>{
            return item.isInputValue === false
        })
    }
    handleChange = event => {
        const { name, value } = event.target;
        let isInputValue, errorMessage;
        if(value.length ){
            isInputValue = true;
            errorMessage = ''
        }
        else{
            isInputValue = false;
            errorMessage = ''
        }
        this.setState({
            [name]: {
                value,
                isInputValue,
                errorMessage
            }
        })
    }
    handleSendeReport = async () =>{
        const {status_current, account_id} = this.props;
        if(this.checkingForm())
            toast.warn('Báo cáo không thành công. Vui lòng nhập nội dung báo cáo!');
        else{
            const create_report_action = await this.props.create_report_action(account_id, status_current._id, {description: this.state.report.value})
            if(create_report_action.type === CREATE_REPORT_SUCCESS){
                toast.success('Báo cáo thành công. Cảm ơn bạn đã gửi báo cáo!');
                this.props.handleShowReportForm();
            }
            else{
                toast.error('Đã xãy ra lỗi trong quá trình báo cáo!');
            }
        }
    }
    render() {
        return (
            <div className={ReportFormCss.report_container}>
                <div className={ReportFormCss.layer_container}>
                    <div className={ReportFormCss.form_layer} >
                        <div className={ReportFormCss.background_layer}onClick={()=>{this.props.handleShowReportForm()}}></div>
                        <div className={ReportFormCss.form_container}>
                            <div className={ReportFormCss.title_container}>
                                <h3>Báo cáo sai phạm</h3>
                            </div>
                            <div className={ReportFormCss.content_container}>
                                <p>Nếu bạn nghi ngờ có hành vi gian lận, vui lòng chọn một lí do và gửi cho chúng tôi. Chúng tôi sẽ xem xét và có biện pháp phù hợp trong thời gian sớm nhất.</p>
                            </div>
                            <div className={ReportFormCss.input_container}>
                                <p>Mô tả</p>
                                <textarea 
                                    placeholder="Nhập báo cáo*" 
                                    onChange={(event) => {this.handleChange(event)}} 
                                    value={this.state.report.value}
                                    name="report" 
                                    id="report"
                                ></textarea>
                                <FormError 
                                    type="report"
                                    isHidden={this.state.report.isInputValue} 
                                    errorMessage={this.state.report.errorMessage}
                                />
                            </div>
                            <div className={ReportFormCss.button_container}>
                                <button className={ReportFormCss.cancle_button} onClick={()=>{this.props.handleShowReportForm()}}>Hủy</button>
                                <button className={ReportFormCss.send_button} onClick={() =>{this.handleSendeReport()}}>Gửi báo cáo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{

    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        create_report_action: async (account_id, status_id, object)=>{
            const action = await create_report_action(account_id, status_id, object);
            return dispatch(action);
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportForm));
