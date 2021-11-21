import React, { Component } from "react";
import { withRouter } from "react-router";
import Notification_item from "./Notification_item";
import Notification_content from "./Notification_content";
import './notification_sender.css'
import "../../../styles/main.css";
class Notification_Sender extends Component {
  render() {
    return (
      <main className="Main">
        <div className="status_content_container">
          <div className="status_content">
            
            <Notification_item />
            <Notification_content />
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(Notification_Sender);
