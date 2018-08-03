import * as React from "react";

import ReactMapGL, {Viewport, Marker, Popup, NavigationControl} from "react-map-gl";

//City Ping
import CityPin from "./cityPin";

//City Info Popup
import CityInfo from "./cityInfo";

export interface GeoMapProps {
  useCustomLocation?: boolean;
  latitude?: number;
  longitude?: number;
  locationEvent?: string; ///< Socket IO Event
}

interface GeoMapState {
  viewPort : Viewport,
  width : number;
  height : number;
  ready : boolean;
  err : string;
  defaultLatitude : number;
  defaultLongitude : number;
  showCityInfo : boolean;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoiaXBlbnl3aXMiLCJhIjoiY2prY2xrMzA3MGFpcjNwcW1mdm02cmpreiJ9.tCIq2g7siynR" +
    "7bR5gQDXpg";

export default class GeoMap extends React.Component < GeoMapProps,
GeoMapState > {

  screen : HTMLDivElement;

  static defaultProps = {
    useCustomLocation: false
  }

  constructor(props : GeoMapProps) {
    super(props);
    this.state = {
      viewPort: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 13
      },
      width: null,
      height: null,
      ready: false,
      err: null,
      defaultLatitude: null,
      defaultLongitude: null,
      showCityInfo: false
    };
    //Bind
    this.RenderCityPin = this
      .RenderCityPin
      .bind(this);
    this.RenderLocationPopup = this
      .RenderLocationPopup
      .bind(this);

    this.RenderPrintButton = this
      .RenderLocationPopup
      .bind(this);

  }

  updateViewPort(viewPort : Viewport) {
    this.setState({viewPort});
  }

  RenderLocationPopup() {
    /*const latitude = this.props.useCustomLocation
      ? this.props.latitude
      : this.state.defaultLatitude;
    const longitude = this.props.useCustomLocation
      ? this.props.longitude
      : this.state.defaultLongitude;
    */
    return (
      <Popup
        longitude={this.state.defaultLongitude}
        latitude={this.state.defaultLatitude}>
        <CityInfo
          info={{
          city: "jeddah",
          state: "",
          image: "nothing"
        }}/>
      </Popup>
    );
  }

  RenderCityPin() {
    /*const latitude = this.props.useCustomLocation
      ? this.props.latitude
      : this.state.defaultLatitude;
    const longitude = this.props.useCustomLocation
      ? this.props.longitude
      : this.state.defaultLongitude;
*/
    return (
      <Marker
        longitude={this.state.defaultLongitude}
        latitude={this.state.defaultLatitude}>
        <CityPin
          size={20}
          onClick={() => this.setState((prevState) => ({
          showCityInfo: !prevState.showCityInfo
        }))}/>
      </Marker>
    );
  }

  componentWillMount() {
    //If we custom location provided via props
    /*if (this.props.useCustomLocation) {
      this.setState((prevState) => ({
        viewPort: {
          ...prevState.viewPort,
          longitude: this.props.longitude,
          latitude: this.props.latitude
        },
        defaultLatitude: this.props.latitude,
        defaultLongitude: this.props.longitude
      }));
    }*/
  }

  componentDidMount() {

    //Get Client Location (Longitude & Latitude) (On Entry!)
    if (!this.props.useCustomLocation) {
      //Get Current Location only if custom location is not being provided!
      navigator
        .geolocation
        .getCurrentPosition((pos) => {
          //Set Pos
          let longitude = pos.coords.longitude;
          let latitude = pos.coords.latitude;
          this.setState((prevState) => ({
            viewPort: {
              ...prevState.viewPort,
              longitude,
              latitude
            },
            defaultLatitude: latitude,
            defaultLongitude: longitude,
            ready: true,
            width: this.screen.clientWidth,
            height: this.screen.clientHeight
          }));

          //Zoom into Place Slowely
          /*if (this.state.viewPort.zoom < 13)
          setInterval(() => {
            this.setState((prevState) => ({
              viewPort: {
                ...prevState.viewPort,
                zoom: prevState.viewPort.zoom + 1
              }
            }));
          }, 100);
          **/
          ///< Evil CODE!!

        }, (err) => {
          //Err
          if (err) 
            this.setState({err: "Could Not Load Map, Please Try Again!"});
          }
        );
    } else {
      this.setState((prevState) => ({
        viewPort: {
          ...prevState.viewPort,
          longitude: this.props.longitude,
          latitude: this.props.latitude
        },
        ready: true,
        width: this.screen.clientWidth,
        height: this.screen.clientHeight,
        defaultLatitude: this.props.latitude,
        defaultLongitude: this.props.longitude
      }));
    }
  }

  RenderPrintButton() {

    return (
      <div className="btn-print">
        SHIT
        <i className="fas fa-print"></i>
      </div>
    );

  }

  render() {

    console.log(this.state);

    // const logitude = this.props.longitude ? this.props.longitude :
    // this.state.viewPort.longitude; const latitude = this.props.latitude ?
    // this.props.latitude : this.state.latitude;

    return (
      <div
        className="screen"
        style={{
        width: "100%",
        height: "100%"
      }}
        ref={(screen) => this.screen = screen}>
        {this.state.ready && !this.state.err && <ReactMapGL
          className="mapBox-container"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width={this.screen.clientWidth}
          height={this.screen.clientHeight}
          {...this.state.viewPort}
          onViewportChange={this
          .updateViewPort
          .bind(this)}>

          <div className="btn print">Print</div>

          <this.RenderCityPin/> {this.state.showCityInfo && <this.RenderLocationPopup/>}

        </ReactMapGL>
}
      </div>
    );

  }

}