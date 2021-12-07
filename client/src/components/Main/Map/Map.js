import React, { Component, Fragment } from "react";
import "./Map.css";
import point_market from "../../../assets/images/circle-point.png";
import ReactMapGL, {
    Marker,
    NavigationControl,
    GeolocateControl,
} from "react-map-gl";
import { key } from "../../../constants/map";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { get_status_list_no_complete } from "../../../stores/actions/status_list_no_completed.action";
import { get_sender_status_list_no_complete } from "../../../stores/actions/sender_status_list_no_completed.action";
import { get_receiver_status_list_no_complete } from "../../../stores/actions/receiver_status_list_no_completed.action";
import { get_car_trip_status_list_no_complete } from "../../../stores/actions/car_trip_status_list_no_completed.action";
import SearchArea from "./SearchArea/SearchArea";
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import LazyLoad from 'react-lazyload';

const navControlStyle = {
    right: 10,
    top: 10,
    boxShadow: 'rgb(0 0 0 / 7%) 0px 1px 1px, rgb(0 0 0 / 7%) 0px 2px 2px, rgb(0 0 0 / 7%) 0px 4px 4px, rgb(0 0 0 / 7%) 0px 8px 8px, rgb(0 0 0 / 7%) 0px 16px 16px',
};

const geolocateControlStyle = {
    right: 10,
    top: 75,
};

const translateStatusType_Color = (status_type, registed) => {
    switch (status_type) {
        case "SENDER":
            return registed ? "#FFA801" : "#FED330";
        case "RECEIVER":
            return registed ? "#EA2027" : "#EE5A24";
        case "CAR_TRIP":
            return registed ? "#009432" : "#A3CB38";
        default:
            return;
    }
};

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: "100%",
                height: "100vh",
                latitude: 15.9261639,
                longitude: 108.2305255,
                zoom: 14,
            },
            all_status_list: [],
            sender_status_list: [],
            receiver_status_list: [],
            car_trip_status_list: [],
            markers: [],
            markersType: ''
        };

        // this.mapContainer = React.createRef();
    }
    transStatusListToMarkers = async (status_list) => {
        let markers = [];
        await Promise.all(
            status_list.map(async (status) => {
                await axios
                    .get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${status.user.address}+việt+nam.json?access_token=${key}`
                    )
                    .then((res) => {
                        const lng = parseFloat(`${res.data.features[0].center[0]}${Math.random() * 10000000000000000}`);
                        const lat = parseFloat(`${res.data.features[0].center[1]}${Math.random() * 10000000000000000}`);
                        markers.push({
                            ...status,
                            longitude: lng,
                            latitude: lat,
                        });
                    })
                    .catch((err) => console.log(err));
                return status;
            })
        );
        return markers;
    }
    componentDidMount = async () => {
        let current_latitude;
        let current_longtitude;
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function (position) {
                current_latitude = position.coords.latitude;
                current_longtitude = position.coords.longitude;
            });

        await this.props.get_status_list_no_complete();
        const all_status_list = await this.props.statusListNoCompeletedReducer.status_list;

        await this.props.get_sender_status_list_no_complete();
        const sender_status_list = await this.props.senderStatusListNoCompletedReducer.sender_status_list;

        await this.props.get_receiver_status_list_no_complete();
        const receiver_status_list = await this.props.receiverStatusListNoCompletedReducer.receiver_status_list;

        await this.props.get_car_trip_status_list_no_complete();
        const car_trip_status_list = await this.props.car_tripStatusListNoCompletedReducer.car_trip_status_list;

        const markers = await this.transStatusListToMarkers(all_status_list);
        this.setState({
            viewport: {
                ...this.state.viewport,
                latitude: current_latitude,
                longitude: current_longtitude,
            },
            all_status_list: all_status_list,
            sender_status_list: sender_status_list,
            car_trip_status_list: car_trip_status_list,
            receiver_status_list: receiver_status_list,
            markers: markers,
            markersType: 'all'
        });
    };

    handleChangeToAllMarkers = async () => {
        if (this.state.markersType !== 'all') {
            const markers = await this.transStatusListToMarkers(this.state.all_status_list);
            this.setState({
                markers: markers,
                markersType: 'all'
            })
        }
    }

    handleChangeToSenderMarkers = async () => {
        if (this.state.markersType !== 'sender') {
            const markers = await this.transStatusListToMarkers(this.state.sender_status_list);
            this.setState({
                markers: markers,
                markersType: 'sender'
            })
        }
    }

    handleChangeToReceiverMarkers = async () => {
        if (this.state.markersType !== 'receiver') {
            const markers = await this.transStatusListToMarkers(this.state.receiver_status_list);
            this.setState({
                markers: markers,
                markersType: 'receiver'
            })
        }
    }

    handleChangeToCarTripMarkers = async () => {
        if (this.state.markersType !== 'car_trip') {
            const markers = await this.transStatusListToMarkers(this.state.car_trip_status_list);
            this.setState({
                markers: markers,
                markersType: 'car_trip'
            })
        }
    }

    handleGetStatus = (marker) => {
        this.props.handleChangeStatusMarker(marker);
    }

    handleChangeLocationAfterSearch = (item) => {
        const lng = parseFloat(`${item.center[0]}${Math.random() * 10000000000000000}`);
        const lat = parseFloat(`${item.center[1]}${Math.random() * 10000000000000000}`);
        this.setState({
            viewport: {
                ...this.state.viewport,
                latitude: lat,
                longitude: lng,
                zoom: 11,
            }
        })
    }
    render() {
        const { viewport, markers, car_trip_status_list, receiver_status_list, sender_status_list, all_status_list } = this.state;
        // console.log(this.state)
        return (
            <div className="Map">
                <LazyLoad placeholder="Đang tải bản đồ">
                    <ReactMapGL
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        {...viewport}
                        onViewportChange={(viewport) => this.setState({ viewport })}
                        mapboxApiAccessToken={key}
                    >
                        <NavigationControl showCompass={false} style={navControlStyle} />
                        <GeolocateControl
                            style={geolocateControlStyle}
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                            auto
                        />
                        {markers.map((marker) => {
                            return (
                                <Marker
                                    key={marker._id}
                                    onClick={() => (this.handleGetStatus(marker))}
                                    longitude={marker.longitude}
                                    latitude={marker.latitude}
                                >
                                    <div className="marker temporary-marker">
                                        <span>
                                            {
                                                <p
                                                    style={{
                                                        width: "25px",
                                                        height: "25px",
                                                        background: `${translateStatusType_Color(
                                                            marker.status_type,
                                                            marker.detail.regis_status
                                                        )}`,
                                                        borderRadius: "50%",
                                                    }}
                                                ></p>
                                            }
                                        </span>
                                    </div>
                                </Marker>
                            );
                        })}
                    </ReactMapGL>
                </LazyLoad>

                <div className="display-status-action-container">
                    <div className="all-status-action" onClick={() => { this.handleChangeToAllMarkers() }}>
                        <span >{all_status_list.length} Tất cả</span>
                    </div>
                    <div className="sender-status-action" onClick={() => { this.handleChangeToSenderMarkers() }} >
                        <span >{sender_status_list.length} Hỗ trợ</span>
                    </div>
                    <div className="receiver-status-action" onClick={() => { this.handleChangeToReceiverMarkers() }}>
                        <span>{receiver_status_list.length} Cần hỗ trợ</span>
                    </div>
                    <div className="car_trip-status-action" onClick={() => { this.handleChangeToCarTripMarkers() }}>
                        <span>{car_trip_status_list.length} Chuyến xe</span>
                    </div>
                </div>
                <SearchArea handleChangeLocationAfterSearch={this.handleChangeLocationAfterSearch} />
            </div>
        );
    }
}

//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
        car_tripStatusListNoCompletedReducer: state.car_tripStatusListNoCompletedReducer,
        receiverStatusListNoCompletedReducer: state.receiverStatusListNoCompletedReducer,
        senderStatusListNoCompletedReducer: state.senderStatusListNoCompletedReducer,
        statusListNoCompeletedReducer: state.statusListNoCompeletedReducer,
    };
};

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_status_list_no_complete: async () => {
            const action = await get_status_list_no_complete();
            return dispatch(action);
        },
        get_sender_status_list_no_complete: async () => {
            const action = await get_sender_status_list_no_complete();
            return dispatch(action);
        },
        get_car_trip_status_list_no_complete: async () => {
            const action = await get_car_trip_status_list_no_complete();
            return dispatch(action);
        },
        get_receiver_status_list_no_complete: async () => {
            const action = await get_receiver_status_list_no_complete();
            return dispatch(action);
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
