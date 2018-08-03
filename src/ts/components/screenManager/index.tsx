import * as React from "react";

import {CommonProps} from "../common";

import * as socketio from "socket.io-client";

import Localizer from "../../localizer";

interface ScreenManagerProps extends CommonProps {
  alert : string;
  localizer : Localizer;
}

interface ScreenManagerState {
  alert : string;
  showLoading : boolean;
  hajGroupLocation : {
    lat: number,
    lng: number
  };
}

import ScreensList from "./screensList";

//Screens
import MainScreen from "../mainScreen"; ///< Main Screen
import GeoMap from "../geoMap"; ///< Geo Map Screen
import PlacesScreen from "../placesScreen/";
import ChatBotScreen from "../chatbotScreen";

interface Screen {
  id : number;
  name : string;
}

//List of Screens, ADD SCREENS HERE
export const screens : Screen[] = [
  {
    id: ScreensList.MAIN,
    name: "main"
  }, {
    id: ScreensList.CONTROL,
    name: "control"
  }, {
    id: ScreensList.LOCATION,
    name: "location"
  }
];

export default class ScreenManager extends React.Component < ScreenManagerProps,
ScreenManagerState > {

  io : any;

  constructor(props : ScreenManagerProps) {
    super(props);
    this.state = {
      alert: null,
      showLoading: false,
      hajGroupLocation: null
    }
    //Bind
  }

  componentWillMount() {}

  getHajGroupLocation() {
    //this.setState()
    if (this.state.hajGroupLocation == null) {
      this
        .props
        .appState
        .io
        .emit("whereIsMyGroup", "SHIT GROUP");

      this
        .props
        .appState
        .io
        .on("yourGroupIs", (res : any) => {
          console.log("Emited and Received: ", res);
          if (this.state.hajGroupLocation == null) {
            this.setState({
              hajGroupLocation: {
                lat: res.lat,
                lng: res.lng
              }
            });
          }
        });
    }
  }

  render() {

    //Decide which screen to Render
    const currentScreen = this.props.appState.currentScreen;
    /*const currentRenderScreen = screens.map((sc) => {
      if (sc.id == this.props.appState.currentScreen)
        return sc;
      }
    );*/

    //Trigger Function Depending on the Current Screen (Next to Render)
    switch (currentScreen) {
      case ScreensList.HAJJ_GROUP_LOCATION:
        this.getHajGroupLocation();
        break;
    }

    console.log(this.props.localizer);

    return (
      <div className="screen-container">
        {currentScreen == ScreensList.MAIN && <MainScreen
          appState={this.props.appState}
          setAppState={this.props.setAppState}
          localizer={this.props.localizer}/>}
        {currentScreen == ScreensList.CONTROL && <div className="haj-alert">{this.props.alert}</div>}
        {currentScreen == ScreensList.LOCATION && <GeoMap/>}
        {currentScreen == ScreensList.HAJJ_GROUP_LOCATION && this.state.hajGroupLocation && <GeoMap
          useCustomLocation={true}
          longitude={this.state.hajGroupLocation.lng}
          latitude={this.state.hajGroupLocation.lat}/>}
        {currentScreen == ScreensList.PLACES && <PlacesScreen
          appState={this.props.appState}
          setAppState={this.props.setAppState}
          localizer={this.props.localizer}/>}
        {currentScreen == ScreensList.CHAT_BOT && <ChatBotScreen
          appState={this.props.appState}
          setAppState={this.props.setAppState}/>}
        {/*<div onClick={() => this.props.setAppState({currentScreen: 1})}>Change me</div>*/}
      </div>
    );

  }

}
