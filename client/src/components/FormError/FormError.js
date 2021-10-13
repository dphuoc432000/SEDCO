import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class FormError extends Component {
    render() {
        if (this.props.isHidden) { return null;}
        return (
            <p style={{ width:'71%',color: 'red', fontSize:'11px'}}>{this.props.errorMessage}</p>
        )
    }
}


export default withRouter(FormError)
