import React, { Component} from 'react';
import { connect } from 'react-redux';
import StatusList from '../StatusList/StatusList';
import { withRouter } from 'react-router';
import Sender_Content from './Sender_Content/Sender_Content';

class Sender_Register extends Component {
    render() {
        return (
            <React.Fragment>
                <StatusList/>
                <Sender_Content />
            </React.Fragment>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sender_Register))