import { Route, Redirect, withRouter } from "react-router";

function AuthenticatedAllRoute({ component: C, appProps, ...rest }) {
    // console.log(C)
    return (
      
      <Route
        {...rest}
        render={props => appProps.checkLocalStorage ? <C {...props} {...appProps} />
            : <Redirect to={`/login?redirect=${props.location}`}/>
        }
      />
    );
}

function AuthenticatedReceiverRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => appProps.isAuthenticated && appProps.role_name === "receiver" ? <C {...props} {...appProps} />
            : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>
        }
      />
    );
}

function AuthenticatedSenderRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => appProps.isAuthenticated && appProps.role_name === "sender" ? <C {...props} {...appProps} />
            : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>
        }
      />
    );
}
function AuthenticatedCarTripRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => appProps.isAuthenticated && appProps.role_name === "car trip" ? <C {...props} {...appProps} />
            : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>
        }
      />
    );
}
export {AuthenticatedAllRoute, AuthenticatedSenderRoute, AuthenticatedCarTripRoute, AuthenticatedReceiverRoute}