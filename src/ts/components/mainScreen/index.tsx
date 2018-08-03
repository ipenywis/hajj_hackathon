import * as React from "react";

import Localizer from "../../localizer";

import {AppState} from "../../store";

//Screen List
import ScreenList from "../screenManager/screensList";

export interface MainScreenProps {
  localizer : Localizer;

  appState : AppState;
  setAppState : (newState : any) => void;
}

interface MainScreenState {}

export default class MainScreen extends React.Component < MainScreenProps,
MainScreenState > {

  constructor(props : MainScreenProps) {
    super(props);
  }

  onMyLocationClick() {
    this
      .props
      .setAppState({currentScreen: ScreenList.LOCATION});
  }

  onGetToMyGroupClick() {
    this
      .props
      .setAppState({currentScreen: ScreenList.HAJJ_GROUP_LOCATION});
  }

  onImportantPlacesClick() {
    this
      .props
      .setAppState({currentScreen: ScreenList.PLACES});
  }

  //Smart Support
  onChatbotClick() {
    this
      .props
      .setAppState({currentScreen: ScreenList.CHAT_BOT});
  }

  render() {

    //Localizer
    let {localizer} = this.props;

    return (
      <div className="screen">
        <div className="btn-special-container">
          <div className="flex-horz center">
            <div
              className="btn-rounded"
              onClick={this
              .onGetToMyGroupClick
              .bind(this)}>
              <div className="text">{localizer.locale("get_to_my_group")}</div>
              <div className="icon"><img src="resources/images/tent.png"/></div>
            </div>
            <div
              className="btn-rounded"
              onClick={this
              .onImportantPlacesClick
              .bind(this)}>
              <div className="text">{localizer.locale("important_places")}</div>
              <div className="icon"><img src="resources/images/star.png"/></div>
            </div>
          </div>
          <div className="flex-horz center">
            <div className="btn-rounded">
              <div className="text">{localizer.locale("fatawa")}</div>
              <div className="icon"><img src="resources/images/book.png"/></div>
            </div>
            <div
              className="btn-rounded"
              onClick={this
              .onMyLocationClick
              .bind(this)}>
              <div className="text">{localizer.locale("my_location")}</div>
              <div className="icon"><img src="resources/images/placeholder.png"/></div>
            </div>
          </div>
          <div className="flex-horz center">
            <div className="btn-rounded">
              <div className="text">{localizer.locale("call_leader")}</div>
              <div className="icon"><img src="resources/images/siren.png"/></div>
            </div>
          </div>
          <div className="flex-horz center">
            <div
              className="btn-rounded large"
              onClick={this
              .onChatbotClick
              .bind(this)}>
              <div className="text">{localizer.locale("chat_bot")}</div>
              <div className="icon">
                <i className="fas fa-comments fa-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}