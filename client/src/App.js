import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import UpdateUserInforForm from "./pages/UpdateUser/UpdateUserInforForm/UpdateUserInforForm";
import UpdateUser from './pages/UpdateUser/UpdateUser'
import { 
  AuthenticatedSenderRoute,
  AuthenticatedReceiverRoute,
  AuthenticatedCarTripRoute,
  AuthenticatedAllRoute
} from "./components/Authentication/authentication";
import "./App.css";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header/Header";
import {getUserInforIsLogined} from "./stores/actions/userIsLogin.action";
import {get_role_user} from './stores/actions/role.action'
import { menuHeader } from "./components/Header/menuHeader";

const translateRoleName = (role_name)=>{
  switch(role_name) {
      case "user":
          return {name:"Người dùng",color:"#808E9B" };
      case "sender":
          return {name:"Người hỗ trợ",color:"#FED330" };
      case "receiver":
          return {name:"Người cần hỗ trợ",color:"#EE5A24" };
      case "car trip":
          return {name:"Người vận chuyển",color:"#A3CB38" };
      case "mod":
          return {name:"Mod",color:"#EA2027" };
      case "admin":
          return {name:"Admin",color: "#EA2027"};
      default:
          return;
  }
}

class App extends React.Component {
  state={
    account_id:'',
    full_name: '',
    isAuthenticated: false,
    role_name: {},
    menu: [],
  }
  componentDidMount = async () =>{
    if(localStorage.getItem('accessToken')){
      const verifyData = await this.props.verifyTokenData;
      await this.props.get_User_Infor_Is_Logined(verifyData.account_id);
      const user = await this.props.userIsLogined.user;
      await this.props.get_role_user_action(verifyData.role_id);
      const role_user = await this.props.roleReducer.role_user;
      if(role_user ){
        const role_name = role_user.role_name;
        const roles = await this.props.roleReducer.roles;
        if(roles.includes(role_name)){
            const menu = menuHeader.find(menu =>{
                return menu.name === role_name;
            }) //-> menu{name:..., menu:[]} 
            this.setState({
              full_name: user.full_name,
              account_id:verifyData.account_id,
              isAuthenticated: true,
              role_name: translateRoleName(role_name),
              menu: menu.menu
            })
        }
      }
    }
    // this.onLoad();
  }
  onLoad = () =>{
    if(localStorage.getItem('accessToken'))
      this.setState({
        isAuthenticated: true
      })
  }
  handleLogin = () =>{
    this.componentDidMount();
  }
  handleLogout = ()=>{
      this.setState({
        full_name: '',
        account_id:'',
        role_name: '',
        menu: [],
        isAuthenticated: false
      })
  }

  handlUpdateFull_name =(value) =>{
    this.setState({
      full_name: value
    })
  }
  render(){
    const checkLocalStorage = localStorage.getItem('accessToken')?true:false
    return (
      <Router>
        <Switch>
            <React.Fragment>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{fontSize:'13px'}}
              />
              <Header handleLogin={this.handleLogin} appProps={this.state} handleLogout={this.handleLogout}/>
              <Route path="/">
                <Home handleLogin={this.handleLogin}/>
              </Route>
              {/*<Route path="/login" exact render={() =>{
                return checkLocalStorage ?  <Redirect to="/"/>:<Login handleLogin={this.handleLogin}/>
              }}>
              </Route>*/}
              
              <AuthenticatedAllRoute exact path="/user/information" component={UpdateUser} appProps={{checkLocalStorage}}/>
              {/*<Route path="/user/information" exact render={() =>{
                return !localStorage.getItem('accessToken') ? <Redirect to="/login"/> : <UpdateUser/>}
              }/>*/}

              {/*<UpdateUser/>
              </Route>*/}
              <Route path="/user/information/update" exact>
                <UpdateUserInforForm handlUpdateFull_name={this.handlUpdateFull_name}/>
              </Route>
            </React.Fragment>
            
            
        </Switch>
      </Router>  
    );
  }
}
//state này của redux không phải react
const mapStateToProps = (state) =>{
  return {
      verifyTokenData: state.verifyTokenReducer,
      roleReducer: state.roleReducer,
      isLogined: state.loginReducer.isLogined,
      userIsLogined: state.userIsLoginReducer
  }
}

//dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
  return {
    get_role_user_action: async (role_id) => {
      const action = await get_role_user(role_id)
      return dispatch(action)
    },
    get_User_Infor_Is_Logined: async (account_id) =>{
      const action = await getUserInforIsLogined(account_id);
      return dispatch(action);
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
