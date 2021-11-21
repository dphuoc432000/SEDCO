import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

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
                <tr>
                    <td>{report._id}</td>
                    <td>{report.account_id}</td>
                    <td>{report.status_id}</td>
                    <td>{converJsonDateToDate(report.createdAt)}</td>
                    <td><p onClick={()=>{this.handleShowDescription()}}>{showDescription?'Đóng':'Chi tiết'}</p></td>
                </tr>
                {showDescription &&
                    <tr>
                        <td colSpan='5'> 
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Mô tả</th>
                                    </tr>
                                    <tr>
                                        <td>{report.description}</td>
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
