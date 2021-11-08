import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import StatusItem from './StatusItem/StatusItem';
import './StatusList.css';
import BasicPagination from '../../../components/Pagination/Pagination';
class StatusList extends Component {
    render() {
        return (
            <div className='status_list_container'>
                <div className="title">
                    <h2>Danh sách đăng ký</h2>
                </div>
                <div className="list">
                    <StatusItem />
                    <StatusItem />
                    <StatusItem />
                    <StatusItem />
                    <StatusItem />
                </div>
                <div className="pagination_container">
                    <BasicPagination/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusList))