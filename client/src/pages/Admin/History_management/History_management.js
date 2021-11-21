import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./History_management.css";

class History_management extends React.Component {
    render() {
        return (
            <div>
                History_management
            </div>
        )
    }
}
//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History_management));
