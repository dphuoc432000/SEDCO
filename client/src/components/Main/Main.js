import React from "react";
// import logo from "../../assets/images/logo.png";
import {withRouter}from "react-router-dom";
// import Home from "../../pages/Home/Home"
import Map from './Map/Map.js'
import Status from './Status/Status.js'
// import './MainContent.css'
import '../../styles/main.css';
import { connect } from "react-redux";
import {get_role_user} from '../../stores/actions/role.action';
import {get_recent_status} from '../../stores/actions/recent_status.action';

const translateRoleName = (role_name)=>{
    switch(role_name) {
        case "user":
            return {role_name: 'user', name:"Người dùng",color:"#808E9B" };
        case "sender":
            return {role_name: 'sender', name:"Người hỗ trợ",color:"#FED330" };
        case "receiver":
            return {role_name: 'receiver', name:"Người cần hỗ trợ",color:"#EE5A24" };
        case "car_trip":
            return {role_name: 'car_trip', name:"Người vận chuyển",color:"#A3CB38" };
        case "mod":
            return {role_name: 'mod', name:"Mod",color:"#EA2027" };
        case "admin":
            return {role_name: 'admin', name:"Admin",color: "#EA2027"};
        default:
            return;
    }
}

class Main extends React.Component {
    state = {
        status_marker: {},
        showFormDetail: false,
        recent_status_list: []
    }
    componentDidMount = async () =>{
        await this.props.get_recent_status();
        const recentStatusReducer = await this.props.recentStatusReducer;
        this.setState({
            recent_status_list: recentStatusReducer.recent_status_list
        })
    }

    handleChangeStatusMarker = (status_marker) =>{
        //thêm role của status_marker
        // console.log(status_marker)
        this.setState({
            status_marker: status_marker,
            showFormDetail: true
        })
    }
    handleHiddenShowFormDetail = () =>{
        this.setState({
            status_marker: {},
            showFormDetail: false
        })
    }
    render() {
        // console.log(this.state)
        return (
            <React.Fragment>
                <Map handleChangeStatusMarker={this.handleChangeStatusMarker} role_name={this.props.role_name}/>
                <Status 
                    recent_status_list={this.state.recent_status_list} 
                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin} 
                    isAuthenticated={this.props.isAuthenticated} 
                    showFormDetail={this.state.showFormDetail} 
                    status_marker={this.state.status_marker} 
                    handleHiddenShowFormDetail={this.handleHiddenShowFormDetail}
                    handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent} 
                    user={this.props.user} status_current={this.props.status_current} 
                    role_name={this.props.role_name} account_id={this.props.account_id}
                    handleChangeStatusMarker={this.handleChangeStatusMarker}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        roleReducer: state.roleReducer,
        recentStatusReducer: state.recentStatusReducer,
    }
  }
  
  //dispatch này của redux không phải react
  const mapDispatchToProps =(dispatch)=>{
    return {
        get_role_user_action: async (role_id) => {
            const action = await get_role_user(role_id)
            return dispatch(action)
        },
        get_recent_status: async () =>{
            const action = await get_recent_status();
            return dispatch(action)
        }
    }
  }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
