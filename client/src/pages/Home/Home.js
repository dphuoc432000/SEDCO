import React, { Component, Fragment } from 'react'
import Header from '../../components/Header/Header'
import "../../styles/main.css";

export default class Home extends Component {
    render() {
        
        let check_localStorage = localStorage.getItem('accessToken')?true:false
        return (
            <Fragment>
                <Header/>
                <main>
                    <>
                        {(check_localStorage)? "đã có Token ":"chưa có token"}
                    </>
                </main>
            </Fragment>
        )
    }
}
