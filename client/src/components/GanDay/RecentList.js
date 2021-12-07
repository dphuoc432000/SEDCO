import React from "react";
import RecentItem from "./RecentItem";
import './RecentList.css'
class RecentList extends React.Component {
    render() {
        const recent_status_list = this.props.recent_status_list;
        return (
            <React.Fragment>
                <h3 style={{margin:'0px 20px'}}>Gần đây</h3>
                <div className="ListRecent">
                    {
                        recent_status_list.map(recent_status_item => {
                            return <RecentItem key={recent_status_item._id} handleChangeStatusMarker={this.props.handleChangeStatusMarker} recent_status_item={recent_status_item} />
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}
export default RecentList;