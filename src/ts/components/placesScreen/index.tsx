import * as React from 'react';

import Localizer from "../../localizer";

import {AppState} from "../../store";

export interface PlacesScreenProps {
  localizer : Localizer;

  appState : AppState;
  setAppState : (newState : any) => void;
}

export interface PlacesScreenState {}

export default class PlacesScreen extends React.Component < PlacesScreenProps,
PlacesScreenState > {

  constructor(props : PlacesScreenProps) {
    super(props);
    this.state = {};
  }

  render() {

    const {localizer} = this.props;

    return (
      <div className="screen">
        <div className="btn-special-container">
          <div className="flex-horz center">
            <div className="btn-rounded">
              <div className="text">{localizer.locale("hospitals")}</div>
              <div className="icon">< img src="resources/images/hospital.png"/></div>
            </div>
            <div className="btn-rounded">
              <div className="text">{localizer.locale("harame")}</div>
              <div className="icon"><img src="resources/images/kaaba.png"/></div>
            </div>
          </div>
          <div className="flex-horz center">
            <div className="btn-rounded">
              <div className="text">{localizer.locale("train")}</div>
              <div className="icon"><img src="resources/images/metro.png"/></div>
            </div>
            <div className="btn-rounded">
              <div className="text">{localizer.locale("police")}</div>
              <div className="icon"><img src="resources/images/police.png"/></div>
            </div>
          </div>
          <div className="flex-horz center">
            <div className="btn-rounded">
              <div className="text">{localizer.locale("bathroom")}</div>
              <div className="icon"><img src="resources/images/toilet.png"/></div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}