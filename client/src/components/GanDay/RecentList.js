import React from "react";
import RecentItem from "./RecentItem";
import './RecentList.css'
class RecentList extends React.Component {
  render() {
    return (
      <div className="ListRecent">
        <RecentItem/>
        <RecentItem/>
        <RecentItem/>
        <RecentItem/>
        <RecentItem/>
        <RecentItem/>
        <RecentItem/>
        
      </div>
    );
  }
}
export default RecentList;