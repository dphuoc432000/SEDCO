import React, { Component} from 'react';
import { connect } from 'react-redux';
import StatusList from '../StatusList/StatusList';
import { withRouter } from 'react-router';
import Receiver_content from './Receiver_content/Receiver_content';

class Receiver_register extends Component {
    render() {
        return (
            <React.Fragment>
                <StatusList/>
                <Receiver_content />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receiver_register))