import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { key } from "../../../../constants/map";
import SuggestItem from './SuggestItem/SuggestItem';
import SearchAreaCss from './SearchArea.module.css';
class SearchArea extends Component {
    state={ 
        search_text: '',
        suggest_list: [],
        suggest_item: {}
    }
    handleChangeSearchText = async (event) =>{
        const value = event.target.value;

            this.setState({
                search_text: value
            })
            clearTimeout(this.timerHandle)
            if(value.length > 0){
                this.timerHandle = await setTimeout(async () =>{
                    await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}+việt+nam.json?access_token=${key}`)
                    .then((res) => {
                    //   const lng = parseFloat(`${res.data.features[0].center[0]}${ Math.random() * 10000000000000000}`);
                    //   const lat = parseFloat(`${res.data.features[0].center[1]}${ Math.random() * 10000000000000000}`);
                    //   markers.push({
                    //     ...status,
                    //     longitude: lng,
                    //     latitude: lat,
                    //   });
                        const suggest_list = res.data.features;
                        this.setState({
                            suggest_list: suggest_list
                        })
                    })
                    .catch((err) => {
                        this.setState({
                            suggest_list:[]
                        })
                    });
                    this.timerHandle = 0
                }, 300)
            }
            else{
                this.setState({
                    suggest_list: []
                })
            }
            
        
    }
    handleOnClickSuggestItem = (item) =>{
        this.setState({
            search_text: item.place_name,
            suggest_list: [],
            suggest_item:item
        })
        this.props.handleChangeLocationAfterSearch(item);
    }
    handleKeyDown = async (event) =>{
        const value = event.target.value;
        if(event.key === 'Enter'){
            await axios
                .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}+việt+nam.json?access_token=${key}`
                )
                .then((res) => {
                //   const lng = parseFloat(`${res.data.features[0].center[0]}${ Math.random() * 10000000000000000}`);
                //   const lat = parseFloat(`${res.data.features[0].center[1]}${ Math.random() * 10000000000000000}`);
                //   markers.push({
                //     ...status,
                //     longitude: lng,
                //     latitude: lat,
                //   });
                    const suggest_item = res.data.features[0];
                    this.setState({
                        suggest_item: suggest_item,
                        suggest_list: [],
                    })
                    this.props.handleChangeLocationAfterSearch(suggest_item);
                })
                .catch((err) => {
                    this.setState({
                        suggest_list:[],
                        suggest_item:''
                    })
                });
        }
    }
    handleBlurSearchText = (event) =>{
        setTimeout(() =>{
            this.setState({
                suggest_list: []
            })
        },1000)
    }
    render() {
        const {search_text, suggest_list} = this.state
        return (
            <div className={SearchAreaCss.search_container}>
                <div className={SearchAreaCss.search_input}>
                    <input 
                        className={SearchAreaCss.search_data}
                        type='text' 
                        value={search_text} 
                        placeholder='Tìm kiếm khu vực' 
                        name='search_text'
                        onChange={(event)=>{this.handleChangeSearchText(event)}}
                        onKeyDown={(event) => {this.handleKeyDown(event)}}
                        onBlur={(event) =>{this.handleBlurSearchText(event)}}
                    />
                </div>
                <div className={SearchAreaCss.suggest_container}>
                    {
                        suggest_list ?
                        suggest_list.map(suggest =>{
                            return <SuggestItem key={suggest.id} suggest={suggest} handleOnClickSuggestItem={this.handleOnClickSuggestItem}/>
                        })
                        :
                        <div className='suggest_item'>
                            <p>Không tìm thấy kết quả.</p>
                        </div>
                    }
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchArea));
