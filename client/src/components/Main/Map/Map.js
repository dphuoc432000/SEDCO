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
import { get_status_list_no_complete } from "../../../stores/actions/status_list.action";
import { get_sender_status_list_no_complete } from "../../../stores/actions/sender_status_list.action";
import { get_receiver_status_list_no_complete } from "../../../stores/actions/receiver_status_list.action";
import { get_car_trip_status_list_no_complete } from "../../../stores/actions/car_trip_status_list.action";

// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const navControlStyle = {
  right: 10,
  top: 10,
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
      all_status_list:[],
      sender_status_list:[],
      receiver_status_list:[],
      car_trip_status_list:[],
      markers: [],
      markersType: ''
    };

    // this.mapContainer = React.createRef();
  }
  transStatusListToMarkers = async (status_list) =>{
    let markers = [];
    await Promise.all(
      status_list.map(async (status) => {
        await axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${status.user.address}+việt+nam.json?access_token=${key}`
          )
          .then((res) => {
            const lng = res.data.features[0].center[0];
            const lat = res.data.features[0].center[1];
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
    const all_status_list = await this.props.statusListReducer.status_list;
    
    await this.props.get_sender_status_list_no_complete();
    const sender_status_list = await this.props.senderStatusListReducer.sender_status_list;

    await this.props.get_receiver_status_list_no_complete();
    const receiver_status_list = await this.props.receiverStatusListReducer.receiver_status_list;

    await this.props.get_car_trip_status_list_no_complete();
    const car_trip_status_list = await this.props.car_tripStatusListReducer.car_trip_status_list;

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

  handleChangeToAllMarkers = async () =>{
    if(this.state.markersType !== 'all'){
      const markers = await this.transStatusListToMarkers(this.state.all_status_list);
      this.setState({
        markers: markers,
        markersType: 'all'
      })
    }
  }

  handleChangeToSenderMarkers = async () =>{
    if(this.state.markersType !== 'sender'){
      const markers = await this.transStatusListToMarkers(this.state.sender_status_list);
      this.setState({
        markers: markers,
        markersType: 'sender'
      })
    }
  }

  handleChangeToReceiverMarkers = async () =>{
    if(this.state.markersType !== 'receiver'){
      const markers = await this.transStatusListToMarkers(this.state.receiver_status_list);
      this.setState({
        markers: markers,
        markersType: 'receiver'
      })
    }
  }

  handleChangeToCarTripMarkers = async () =>{
    if(this.state.markersType !== 'car_trip'){
      const markers = await this.transStatusListToMarkers(this.state.car_trip_status_list);
      this.setState({
        markers: markers,
        markersType: 'car_trip'
      })
    }
  }

  render() {
    const { viewport, markers, car_trip_status_list, receiver_status_list, sender_status_list, all_status_list } = this.state;
    // console.log(this.state)
    return (
      <div className="Map">
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
                onClick={() => {
                  console.log("click");
                }}
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
        <div className="display-status-action-container">
          <div className="all-status-action" onClick={() =>{this.handleChangeToAllMarkers()}}>
            <span >{all_status_list.length} Tất cả</span>
          </div>
          <div className="sender-status-action" onClick={() =>{this.handleChangeToSenderMarkers()}} >
            <span >{receiver_status_list.length} Hỗ trợ</span>
          </div>
          <div className="receiver-status-action" onClick={() =>{this.handleChangeToReceiverMarkers()}}>
            <span>{sender_status_list.length} Cần hỗ trợ</span>
          </div>
          <div className="car_trip-status-action" onClick={() =>{this.handleChangeToCarTripMarkers()}}>
            <span>{car_trip_status_list.length} Chuyến xe</span>
          </div>
        </div>
      </div>
    );
  }
}

//state này của redux không phải react
const mapStateToProps = (state) => {
  return {
    car_tripStatusListReducer: state.car_tripStatusListReducer,
    receiverStatusListReducer: state.receiverStatusListReducer,
    senderStatusListReducer: state.senderStatusListReducer,
    statusListReducer: state.statusListReducer,
  };
};

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
  return {
    get_status_list_no_complete: async () => {
      const action = await get_status_list_no_complete();
      return dispatch(action);
    },
    get_sender_status_list_no_complete: async () =>{
      const action = await get_sender_status_list_no_complete();
      return dispatch(action);
    },
    get_car_trip_status_list_no_complete: async () =>{
      const action = await get_car_trip_status_list_no_complete();
      return dispatch(action);
    },
    get_receiver_status_list_no_complete: async () =>{
      const action = await get_receiver_status_list_no_complete();
      return dispatch(action);
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
