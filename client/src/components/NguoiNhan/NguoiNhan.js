import React from "react";
import SLCanNhan from "./SLCanNhan"
import StatusForStatus from "../StatusForStatus/StatusForStatus";
import './NguoiNhan.css'

class NguoiNhan extends React.Component {
  render() {
    return (
      <div className="NguoiNhan">
        <StatusForStatus />
        <SLCanNhan />
        
      </div>
    );
  }
}
export default NguoiNhan;
