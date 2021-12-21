import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import UpdateUserInforForm from "./pages/UpdateUser/UpdateUserInforForm/UpdateUserInforForm";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import Transaction_Management from "./pages/Transaction_Management/Transaction_Management";
import {
    AuthenticatedSenderRoute,
    AuthenticatedReceiverRoute,
    AuthenticatedCarTripRoute,
    AuthenticatedAllRoute,
    AuthenticatedAdminRoute
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
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import { getUserInforIsLogined } from "./stores/actions/userIsLogin.action";
import { get_role_user } from "./stores/actions/role.action";
import { menuHeader } from "./components/Header/menuHeader";
import { get_status_current_action } from "./stores/actions/status_current.action";
import { STATUS_CURRENT_SUCCESS } from "./constants/actions";
import Notification_Sender from "./components/Notification/Sender/Notification_Sender";
import Notification_Receiver from "./components/Notification/Receiver/Notification_Receiver";
import Management_Quantity from "./components/Manage_Quantity/Management_Quantity";
import Message from './components/Message/Message';
import { io } from 'socket.io-client'
const translateRoleName = (role_name) => {
    switch (role_name) {
        case "user":
            return { role_name: "user", name: "Người dùng", color: "#808E9B" };
        case "sender":
            return { role_name: "sender", name: "Người hỗ trợ", color: "#FED330" };
        case "receiver":
            return {
                role_name: "receiver",
                name: "Người cần hỗ trợ",
                color: "#EE5A24",
            };
        case "car_trip":
            return {
                role_name: "car_trip",
                name: "Người vận chuyển",
                color: "#A3CB38",
            };
        case "mod":
            return { role_name: "mod", name: "Mod", color: "#EA2027" };
        case "admin":
            return { role_name: "admin", name: "Admin", color: "#EA2027" };
        default:
            return;
    }
};
let socket = React.createRef()
socket.current = io('localhost:5000');
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account_id: "",
            full_name: "",
            isAuthenticated: false,
            role_name: {},
            menu: [],
            showFormLogin: false,
            showFormRegister: false,
            showFormForgotPassword: false,
            status_current: {},
            user: {},
            showMessage: false,
            conversation: {},
            watchNewMessage: false,
        };
    }
    componentWillMount = () => {
        socket.current.on('welcome', message => {
            console.log(message)
        })
        console.log(socket)
    }

    componentDidMount = async () => {
        if (localStorage.getItem("accessToken")) {
            const verifyData = await this.props.verifyTokenData;
            //   const statusCurrentData = await this.props.statusCurrentReducer;
            let statusCurrentData = {};
            await this.props.get_User_Infor_Is_Logined(verifyData.account_id);
            const user = await this.props.userIsLogined.user;
            await this.props.get_role_user_action(verifyData.role_id);
            const role_user = await this.props.roleReducer.role_user;
            if (role_user) {
                const role_name = role_user.role_name;
                const roles = await this.props.roleReducer.roles;

                if (roles.includes(role_name)) {
                    const menu = menuHeader.find((menu) => {
                        return menu.name === role_name;
                    }); //-> menu{name:..., menu:[]}
                    if (role_name !== "admin" || role_name !== "mod") {
                        const get_status_current_action =
                            await this.props.get_status_current_action(verifyData.account_id);
                        if (get_status_current_action.type === STATUS_CURRENT_SUCCESS)
                            statusCurrentData = await this.props.statusCurrentReducer;
                    }
                    this.setState({
                        full_name: user.full_name,
                        account_id: verifyData.account_id,
                        isAuthenticated: true,
                        role_name: translateRoleName(role_name),
                        menu: menu.menu,
                        status_current: statusCurrentData,
                        user: user,
                    });
                }
            }
        }
        // this.onLoad();
    };
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.account_id !== prevState.account_id) {
            socket.current.emit('addAccount', this.state.account_id)
            socket.current.on('getAccounts', accounts => {
                console.log(accounts)
            })
        }
    }
    onLoad = () => {
        if (localStorage.getItem("accessToken"))
            this.setState({
                isAuthenticated: true,
            });
    };

    handleLogin = () => {
        this.componentDidMount();
        this.setState({
            showFormLogin: !this.state.showFormLogin,
            isAuthenticated: true,
        });
    };

    handleLogout = () => {
        this.setState({
            full_name: "",
            account_id: "",
            role_name: "",
            menu: [],
            isAuthenticated: false,
            status_current: {},
            user: {},
            showMessage: false,
        });
    };

    handlUpdateFull_name = (value) => {
        this.setState({
            full_name: value,
        });
    };

    handleChangeShowFormLogin = () => {
        this.setState({
            showFormLogin: !this.state.showFormLogin,
            showFormRegister: false,
            showFormForgotPassword: false,
        });
    };
    handleChangeShowFormRegister = () => {
        this.setState({
            showFormRegister: !this.state.showFormRegister,
            showFormLogin: false,
            showFormForgotPassword: false,
        });
    };

    handleChangeShowFormForgotPassword = () => {
        this.setState({
            showFormRegister: false,
            showFormLogin: false,
            showFormForgotPassword: !this.state.showFormForgotPassword,
        });
    };
    handleUpdateStatusCurrent = async (status_current) => {
        await this.props.get_status_current_action(this.state.account_id);
        const statusCurrentData = await this.props.statusCurrentReducer;
        this.setState({
            status_current: statusCurrentData,
        });
    };
    handleLoadAgainWhenCreateStatus = async () => {
        await this.componentDidMount();
    };

    handleLoadAgainWhenConfirmNotify = async () => {
        await this.componentDidMount();
    }
    handleChangeQuantityCarAfterConfirm = async () => {
        await this.props.get_status_current_action(this.state.account_id);
        const statusCurrentData = await this.props.statusCurrentReducer;
        this.setState({
            status_current: statusCurrentData,
        });
    }
    handleShowMessage = () => {
        this.setState({
            showMessage: !this.state.showMessage
        })
    }
    handleShowMessageWhenClickConversation = (conversation) => {
        this.setState({
            showMessage: true,
            conversation: conversation,
        })
    }
    handleWatchedNewMessage = (conversation_list) => {
        this.setState({
            watchNewMessage: !conversation_list.some(conversation => conversation.watched === false)
        })
    }
    handleUpdateWatchedNewMessage = () => {
        this.setState({
            watchNewMessage: true
        })
    }



    render() {
        const checkLocalStorage = localStorage.getItem("accessToken") ? true : false;
        // console.log(Object.keys(this.state.role_name).length? true: false)
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
                            style={{ fontSize: "13px" }}
                        />
                        <Header
                            handleChangeShowFormLogin={this.handleChangeShowFormLogin}
                            handleLogin={this.handleLogin}
                            appProps={this.state}
                            handleLogout={this.handleLogout}
                            status_current={this.state.status_current}
                            handleShowMessageWhenClickConversation={this.handleShowMessageWhenClickConversation}
                            account_id={this.state.account_id}
                            socket={socket}
                            newMessage={this.state.newMessage}
                            handleWatchedNewMessage={this.handleWatchedNewMessage}
                            watchNewMessage={this.state.watchNewMessage}
                            handleUpdateWatchedNewMessage={this.handleUpdateWatchedNewMessage}
                        />
                        <Route path="/" exact>
                            <Home
                                handleChangeShowFormLogin={this.handleChangeShowFormLogin}
                                showFormLogin={this.state.showFormLogin}
                                handleLogin={this.handleLogin}
                                handleChangeShowFormRegister={this.handleChangeShowFormRegister}
                                showFormRegister={this.state.showFormRegister}
                                handleChangeShowFormForgotPassword={
                                    this.handleChangeShowFormForgotPassword
                                }
                                showFormForgotPassword={this.state.showFormForgotPassword}
                                role_name={this.state.role_name}
                                account_id={this.state.account_id}
                                status_current={this.state.status_current}
                                user={this.state.user}
                                handleUpdateStatusCurrent={this.handleUpdateStatusCurrent}
                                handleLoadAgainWhenCreateStatus={
                                    this.handleLoadAgainWhenCreateStatus
                                }
                                isAuthenticated={this.state.isAuthenticated}
                                handleShowMessageWhenClickConversation={this.handleShowMessageWhenClickConversation}
                            />
                        </Route>
                        <Route path="/car_trip/quantity_management" exact>
                            <Management_Quantity
                                 appProps={{
                                    // checkLocalStorage,
                                    // handleChangeShowFormLogin: this.handleChangeShowFormLogin,
                                    // role_name: this.state.role_name.role_name,
                                    // account_id: this.state.account_id,
                                    // isAuthenticated: this.state.isAuthenticated,
                                    status_current: this.state.status_current,
                                    // handleLoadAgainWhenConfirmNotify: this.handleLoadAgainWhenConfirmNotify,
                                }}
                            />
                        </Route>

                        {checkLocalStorage && Object.keys(this.state.role_name).length ? (
                            <React.Fragment>
                                <AuthenticatedAdminRoute
                                    exact={false}
                                    path="/admin"
                                    component={Admin}
                                    appProps={{
                                        checkLocalStorage,
                                        handleChangeShowFormLogin: this.handleChangeShowFormLogin,
                                        role_name: this.state.role_name.role_name,
                                        account_id: this.state.account_id,
                                        isAuthenticated: this.state.isAuthenticated,
                                        status_current: this.state.status_current,
                                        handleChangeQuantityCarAfterConfirm: this.handleChangeQuantityCarAfterConfirm,
                                        handleShowMessageWhenClickConversation: this.handleShowMessageWhenClickConversation
                                    }}
                                />
                                <AuthenticatedAllRoute
                                    exact
                                    path="/user/information"
                                    component={UpdateUser}
                                    appProps={{
                                        checkLocalStorage,
                                        handleChangeShowFormLogin: this.handleChangeShowFormLogin,
                                    }}
                                />

                                <AuthenticatedCarTripRoute
                                    exact={false}
                                    path="/car_trip/transaction_management"
                                    component={Transaction_Management}
                                    appProps={{
                                        checkLocalStorage,
                                        handleChangeShowFormLogin: this.handleChangeShowFormLogin,
                                        role_name: this.state.role_name.role_name,
                                        account_id: this.state.account_id,
                                        isAuthenticated: this.state.isAuthenticated,
                                        status_current: this.state.status_current,
                                        handleChangeQuantityCarAfterConfirm: this.handleChangeQuantityCarAfterConfirm,
                                        handleShowMessageWhenClickConversation: this.handleShowMessageWhenClickConversation
                                    }}
                                />

                                <AuthenticatedSenderRoute
                                    path="/notification/sender"
                                    exact={true}
                                    component={Notification_Sender}
                                    appProps={{
                                        checkLocalStorage,
                                        handleChangeShowFormLogin: this.handleChangeShowFormLogin,
                                        role_name: this.state.role_name.role_name,
                                        account_id: this.state.account_id,
                                        isAuthenticated: this.state.isAuthenticated,
                                        status_current: this.state.status_current,
                                        handleShowMessageWhenClickConversation: this.handleShowMessageWhenClickConversation,
                                        handleLoadAgainWhenCreateStatus:this.handleLoadAgainWhenCreateStatus
                                    }}
                                />

                                <AuthenticatedReceiverRoute
                                    path="/notification/receiver"
                                    exact={true}
                                    component={Notification_Receiver}
                                    appProps={{
                                        checkLocalStorage,
                                        handleChangeShowFormLogin: this.handleChangeShowFormLogin,
                                        role_name: this.state.role_name.role_name,
                                        account_id: this.state.account_id,
                                        isAuthenticated: this.state.isAuthenticated,
                                        status_current: this.state.status_current,
                                        handleLoadAgainWhenConfirmNotify: this.handleLoadAgainWhenConfirmNotify,
                                        handleShowMessageWhenClickConversation: this.handleShowMessageWhenClickConversation,
                                        handleLoadAgainWhenCreateStatus:this.handleLoadAgainWhenCreateStatus
                                    }}
                                />

                                <Route path="/user/information/update" exact>
                                    <UpdateUserInforForm
                                        handlUpdateFull_name={this.handlUpdateFull_name}
                                    />
                                </Route>
                                
                            </React.Fragment>
                        ) : (
                            <Route path="*">
                                {!checkLocalStorage &&
                                    !Object.keys(this.state.role_name).length && (
                                        <React.Fragment>
                                            <Redirect to="/" />
                                        </React.Fragment>
                                    )}
                            </Route>
                        )}
                        {this.state.isAuthenticated && this.state.showMessage &&
                            <Message
                                socket={socket}
                                handleShowMessage={this.handleShowMessage}
                                conversation={this.state.conversation}
                                account_id={this.state.account_id}
                            />
                        }
                    </React.Fragment>
                </Switch>
            </Router>
        );
    }
}
//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
        statusCurrentReducer: state.statusCurrentReducer,
        verifyTokenData: state.verifyTokenReducer,
        roleReducer: state.roleReducer,
        isLogined: state.loginReducer.isLogined,
        userIsLogined: state.userIsLoginReducer,
    };
};

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_role_user_action: async (role_id) => {
            const action = await get_role_user(role_id);
            return dispatch(action);
        },
        get_User_Infor_Is_Logined: async (account_id) => {
            const action = await getUserInforIsLogined(account_id);
            return dispatch(action);
        },
        get_status_current_action: async (account_id) => {
            const action = await get_status_current_action(account_id);
            return dispatch(action);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
