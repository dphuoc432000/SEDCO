import React from "react";
import RecentItem from "./RecentItem";
import './RecentList.css'
class RecentList extends React.Component {
  render() {
    const recent_status_list = this.props.recent_status_list;
    return (
      <div className="ListRecent">
        {
          recent_status_list.map(recent_status_item =>{
            return <RecentItem key={recent_status_item._id} handleChangeStatusMarker={this.props.handleChangeStatusMarker} recent_status_item={recent_status_item}/>
          })
        }
      </div>
    );
  }
}
export default RecentList;