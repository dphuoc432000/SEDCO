import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Management_of_misconduct_reportCss from '../Management_of_misconduct_report.module.css'
function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}

class Row extends Component {
    state = {
        report: this.props.report,
        showDescription: false
    }
    handleShowDescription = ()=>{
        this.setState({
            showDescription: !this.state.showDescription
        })
    }
    render() {
        const {report, showDescription} = this.state
        return (
            <React.Fragment>
                <tr className={Management_of_misconduct_reportCss.table_main_row_data}>
                    <td>{report._id}</td>
                    <td>{report.account_id}</td>
                    <td>{report.status_id}</td>
                    <td>{converJsonDateToDate(report.createdAt)}</td>
                    <td><p className={Management_of_misconduct_reportCss.btn_information} onClick={()=>{this.handleShowDescription()}}>{showDescription?'Đóng':'Chi tiết'}</p></td>
                </tr>
                {showDescription &&
                    <tr>
                        <td colSpan='5'> 
                            <table className={Management_of_misconduct_reportCss.table_main__sub}>
                                <tbody>
                                    <tr>
                                        <th className={Management_of_misconduct_reportCss.tb_main_sub_column_title}>Mô tả</th>
                                    </tr>
                                    <tr>
                                        <td className={Management_of_misconduct_reportCss.tb_main_sub_column_data}>{report.description}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                }
                
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    }
};
const mapDispatchToProps = (dispatch) =>{
    return {

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Row));
