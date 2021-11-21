import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import StatusItem from './StatusItem/StatusItem';
import './StatusList.css';
import BasicPagination from '../../../components/Pagination/Pagination';
class StatusList extends Component {
    // state={
    //     status_list: []
    // }
    // componentDidUpdate = (prevProps) =>{
    //     if(this.props.status_list !== prevProps.status_list)
    //         this.setState({
    //             status_list: this.props.status_list
    //         })
    // }
    render() {
        const status_list = this.props.status_list;
        return (
            <div className='status_list_container'>
                <div className="title">
                    <h2>Danh sách đăng ký</h2>
                </div>
                <div className="list">
                    {   status_list.length > 0 ?
                        status_list.map(status_item =>{
                            return <StatusItem handleInfomationStatusItem={this.props.handleInfomationStatusItem} key={status_item._id} status_item={status_item} />
                        })
                        :
                        <p>Danh sách trống</p>
                    }
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