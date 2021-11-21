import React, { Component, PureComponent } from "react";
import { Switch, Route, withRouter } from "react-router";
import Notification_Sender from "./Sender/Notification_Sender";
import Notification_Receiver from "./Receiver/Notification_Receiver";
import Notification_Cartrip from "./Cartrip/Notification_Cartrip";
import "../../styles/main.css";
import { connect } from 'react-redux';
class Notication extends PureComponent {
  render() {
    return (
      <main className="Main">
        <Switch>
          <Route exact path={"/receiver/notification"}>
            <Notification_Receiver />
          </Route>
          <Route exact path={"/sender/notification"}>
            <Notification_Sender />
          </Route>
          <Route exact path={"/car_trip/notification"}>
            <Notification_Cartrip />
          </Route>
        </Switch>
      </main>
    );
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notication));
