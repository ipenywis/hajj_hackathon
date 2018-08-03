import * as React from "react";

import {Language} from "./components/layout";

//Sockt.io Client
import * as Socketio from "socket.io-client";

//Main App State
export interface AppState {
  currentScreen : number;
  currentLanguage : string;
  languages : Language[];
  io : SocketIOClient.Socket;
}

export interface StoreProps {}

/*interface StoreState {
  appState : AppState; ///< Main App State
  setAppState : (newState : any) => void; ///< Update Main App State
}
*/
type StoreState = AppState;

export default class Store extends React.Component < StoreProps,
StoreState > {
  state : StoreState;
  io : SocketIOClient.Socket;

  constructor(props : StoreProps) {
    super(props);
    //Main App State
    this.state = {
      currentScreen: 0, ///< Current Screen (Default 0 => Arabic)
      currentLanguage: "ar",
      io: null,
      languages: [
        {
          code: "ar",
          name: "عربي",
          logo: "resources/images/ar.png"
        }, {
          code: "en",
          name: "English",
          logo: "resources/images/en.png"
        }, {
          code: "fr",
          name: "Français",
          logo: "resources/images/fr.png"
        }, {
          code: "pak",
          name: "اردو",
          logo: "resources/images/pak.png"
        }, {
          code: "in",
          name: "हिंदी भाषा",
          logo: "resources/images/in.png"
        }, {
          code: "bng",
          name: "বাংলা ভাষা",
          logo: "resources/images/bng.png"
        }, {
          code: "ngr",
          name: "Hausa",
          logo: "resources/images/ngr.png"
        }, {
          code: "tr",
          name: "Türkçe",
          logo: "resources/images/tr.png"
        }
      ]
    }
  }

  setAppState(newState : any, callback?: () => void) {
    //Update Main App State
    this.setState(newState, callback);
  }

  componentWillMount() {

    //Connect to Websocket Server Initialze Server Socket Connection
    let io = Socketio("http://192.168.8.103:5000");
    this.setState({io});
    console.log("Socket IO: ", io);
  }

  render() {

    console.log(this.state);

    return (
      <div className="main-container">
        {/* Render Children */}
        {this.props.children && React
          .Children
          .map(this.props.children, (child, idx) => {
            return React.cloneElement(child as React.ReactElement < any >, {
              appState: this.state,
              setAppState: this
                .setAppState
                .bind(this)
            });
          })}
        {/*No Childs!*/}
        {!this.props.children && <div style={{
          textAlign: "center"
        }}>No Childs To Render</div>}
      </div>
    );

  }

}