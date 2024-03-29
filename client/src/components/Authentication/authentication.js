import React from "react";
import { Route, Redirect } from "react-router";
import {toast } from 'react-toastify';
const notifyTost = (value)=>{
  toast.warn(value)
}
function AuthenticatedAllRoute({ component: C, appProps, ...rest }) {
    // console.log(C)
    return (
      
      <Route
        {...rest}
        render={props => appProps.checkLocalStorage ? <C {...props} {...appProps} />
            : 
            <React.Fragment>
              {notifyTost("Vui lòng đăng nhập!")}
              {appProps.handleChangeShowFormLogin()}
              <Redirect to={`/?redirect=${props.location}`}/>
            </React.Fragment>
        }
      />
    );
}

function AuthenticatedReceiverRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => appProps.isAuthenticated && appProps.role_name === "receiver" ? <C {...props} {...appProps} />
            : 
            <React.Fragment>
                {   !appProps.isAuthenticated ? 
                    <React.Fragment>
                        {notifyTost("Vui lòng đăng nhập!")}
                        {appProps.handleChangeShowFormLogin()}
                        <Redirect to={`/?redirect=${props.location.pathname}${props.location.search}`}/>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Redirect to={appProps.role_name !== 'admin' ? `/`:'/admin'}/>
                    </React.Fragment>
                }
              
            </React.Fragment>
        }
      />
    );
}

function AuthenticatedSenderRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => appProps.checkLocalStorage && appProps.role_name === "sender" ? <C {...props} {...appProps} />
            : 
            <React.Fragment>
              { !appProps.isAuthenticated ?
                <React.Fragment> 
                  {notifyTost("Vui lòng đăng nhập!")}
                  {appProps.handleChangeShowFormLogin()}
                  <Redirect to={`/?redirect=${props.location}`}/>
                </React.Fragment>
                :
                <React.Fragment>
                  <Redirect to={appProps.role_name !== 'admin' ? `/`:'/admin'}/>
                </React.Fragment>
              }
              
            </React.Fragment>
        }
      />
    );
}
function AuthenticatedCarTripRoute({ component: C, appProps, ...rest }) {
  // console.log(appProps)
    return (
      <Route
        {...rest}
        render={props => appProps.checkLocalStorage && appProps.role_name === "car_trip" ? 
            <React.Fragment>
              <C {...props} {...appProps} />
            </React.Fragment>
            : 
            <React.Fragment>
              { !appProps.isAuthenticated ?
                <React.Fragment> 
                  {notifyTost("Vui lòng đăng nhập!")}
                  {appProps.handleChangeShowFormLogin()}
                  <Redirect to={`/?redirect=${props.location}`}/>
                </React.Fragment>
                :
                <React.Fragment>
                  <Redirect to={appProps.role_name !== 'admin' ? `/`:'/admin'}/>
                </React.Fragment>
              }
              
            </React.Fragment>
        }
      />
    );
}

function AuthenticatedAdminRoute({ component: C, appProps, ...rest }) {
  // console.log(appProps)
    return (
      <Route
        {...rest}
        render={props => appProps.checkLocalStorage && appProps.role_name === "admin" ? 
            <React.Fragment>
              <C {...props} {...appProps} />
            </React.Fragment>
            : 
            <React.Fragment>
              { !appProps.isAuthenticated ?
                <React.Fragment> 
                  {notifyTost("Vui lòng đăng nhập!")}
                  {appProps.handleChangeShowFormLogin()}
                  <Redirect to={`/?redirect=${props.location}`}/>
                </React.Fragment>
                :
                <React.Fragment>
                  <Redirect to={appProps.role_name !== 'admin' ? `/`:'/admin'}/>
                </React.Fragment>
              }
              
            </React.Fragment>
        }
      />
    );
}
export {AuthenticatedAllRoute, AuthenticatedSenderRoute, AuthenticatedCarTripRoute, AuthenticatedReceiverRoute, AuthenticatedAdminRoute}