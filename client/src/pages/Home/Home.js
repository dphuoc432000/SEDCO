import React, { Component, Fragment } from 'react';
import Main from '../../components/Main/Main'
import "../../styles/main.css";
// import {  } from 'react-router';
import {
  Route,
  withRouter
} from "react-router-dom";
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';

export default withRouter(class Home extends Component {
    render() {
        return (
                <Fragment>
                    <Route path="/" exact>
                        <Main/>
                    </Route>
                    <Route path="/login" exact>
                        <Login handleLogin={this.props.handleLogin}/>
                    </Route>
                    <Route path="/register" exact>
                        <Register/>
                    </Route>
                </Fragment>
            
        )
    }
})
