import React, { Component, Fragment } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main'
import "../../styles/main.css";
import { withRouter } from 'react-router';

export default withRouter(class Home extends Component {
    render() {
        console.log('data', this.props)
        let check_localStorage = localStorage.getItem('accessToken')?true:false
        return (
            <Fragment>
                {console.log('đã vào render')}
                <Header/>
                <Main/>
                {/*<main>
                    <>
                    bd
                        {console.log('đã vào main')}
                        {(check_localStorage)? "đã có Token ":"chưa có token"}
                    </>
                </main>*/}
            </Fragment>
        )
    }
})
