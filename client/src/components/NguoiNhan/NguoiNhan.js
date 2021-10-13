import React from "react";
import SLCanNhan from "./SLCanNhan"
import GanDay from "../GanDay/RecentList"
import StatusForStatus from "../StatusForStatus/StatusForStatus";
import './NguoiNhan.css'

class NguoiNhan extends React.Component {
  render() {
    return (
      <div className="NguoiNhan">
        <StatusForStatus />
        <SLCanNhan />
        <GanDay />
      </div>
    );
  }
}
export default NguoiNhan;
