import * as React from "react";

import {Language} from "../ts/components/dashboard";

//Main App State
export interface AppState {
  languages : Language[];
}

export interface StoreProps {}

interface StoreState {
  appState : AppState; ///< Main App State
  setAppState : (newState : any) => void; ///< Update Main App State
}

export default class Store extends React.Component < StoreProps,
StoreState > {
  state : StoreState;

  constructor(props : StoreProps) {
    super(props);
    //Main App State
    this.state = {
      appState: {
        languages: [
          {
            code: "ar",
            name: "Arabic",
            logo: "nothing!"
          }, {
            code: "en",
            name: "English",
            logo: "nothing!"
          }, {
            code: "fr",
            name: "Frensh",
            logo: "nothing!"
          }
        ]
      },
      setAppState: this
        .setAppState
        .bind(this)
    }
  }

  setAppState(newState : any, callback?: () => void) {
    //Update Main App State
    this.setState({
      appState: newState
    }, callback);
  }

  render() {

    return (
      <div className="main-container">
        {/* Render Children */}
        {this.props.children && React
          .Children
          .map(this.props.children, (child, idx) => {
            return React.cloneElement(child as React.ReactElement < any >, {
              appState: this.state.appState,
              setAppState: this.state.setAppState
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