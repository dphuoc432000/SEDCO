import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchAreaCss from '../SearchArea.module.css';
class SuggestItem extends Component {
    // state = {
    //     suggest: this.props.suggest
    // }
    render() {
        // const {suggest} = this.state;
        const suggest = this.props.suggest;
        return (
            <div onClick={()=>{console.log('click'); this.props.handleOnClickSuggestItem(suggest)}} className={SearchAreaCss.suggest_item}>
                {
                    suggest &&
                    <p >{suggest.place_name}</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    };
}
const mapDispatchToProps = (dispatch) =>{
    return {

    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SuggestItem));