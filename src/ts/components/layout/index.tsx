import * as React from "react";

//Store State Wrapper
import {CommonProps} from "../common";

//ScreenManager (Render Right Screen)
import ScreenManager from "../screenManager";

import * as socketio from "socket.io-client";

//Screen List
import ScreenList from "../screenManager/screensList";

//Localizer
import Localizer from "../../localizer";

export interface LayoutProps extends CommonProps {};

interface LayoutState {
  alert : string;
}

export default class Layout extends React.Component < LayoutProps,
LayoutState > {

  localizer : Localizer;

  constructor(props : LayoutProps) {
    super(props);
    this.state = {
      alert: null
    };

    //Init Language Localizer
    this.localizer = new Localizer();
    //Set default Language (AR)
    this
      .localizer
      .setCurrentLanguage("ar");
  }

  componentWillMount() {}

  render() {

    this
      .localizer
      .locale("nothing");

    return (
      <div className="dashboard-container">
        <div className="dashboard-top">
          <div className="app-logo"><img src="resources/images/nateq_logo_thick.png"/></div>
        </div>
        <div className="dashboard-main">
          <ScreenManager
            appState={this.props.appState}
            setAppState={this.props.setAppState}
            localizer={this.localizer}
            alert={this
            .localizer
            .locale("welcome_screen")}/>
        </div>
        {true && <div className="dashboard-footer">
          <SelectLanguage
            languages={this.props.appState.languages}
            localizer={this.localizer}
            setAppState={this.props.setAppState}
            io={this.props.appState.io}/>
          <Navigation setAppState={this.props.setAppState}/>
        </div>}
      </div>
    );

  }

}

//Images
import "./icons";
import {Socket} from "net";

//Language Selection
export interface Language {
  code : string;
  name : string;
  logo : string;
}

interface SelectLanguageProps {
  languages : Language[];
  io : SocketIOClient.Socket;
  localizer : Localizer;
  setAppState : (newState : any) => void;
};
const SelectLanguage : React.SFC < SelectLanguageProps > = (props : SelectLanguageProps) => {
  const {languages, localizer, setAppState} = props;

  console.log(" Languages:  ", languages);

  //Errors
  let languageInvalidErr = null;

  //Update Current Language
  const onChooseLanguage = (e : React.MouseEvent, langCode : string) => {
    if (!Localizer.isLangValid(langCode)) {
      languageInvalidErr = "Error Changing Language, Invalide Format";
      return;
    }
    console.log("You Have Chosen: ", langCode);
    //Update it
    localizer.setCurrentLanguage(langCode);
    //Update Component (So it Rerenders)
    setAppState({currentLanguage: langCode});
  };

  const changeLang = () => {
    props
      .io
      .emit("lang", () => {});
  }

  return (
    <div className="dh-languages-container">
      {languages.map((language, idx) => {
        return <div
          className="dh-language"
          key={idx}
          onClick={(e) => onChooseLanguage(e, language.code)}>
          <div className="language-icon" onClick={changeLang}><img src={language.logo}/></div>
          <div className="language-text">{language.name}</div>
        </div>;
      })}
    </div>
  );
};

//Screens Navigation
interface NavigationProps {
  setAppState : (newState : any) => void;
}

const Navigation : React.SFC < NavigationProps > = (props : NavigationProps) => {

  const goHome = () => {
    props.setAppState({currentScreen: 0});
  };

  const goBack = () => {};

  return (
    <div className="navigation-container">
      <div className="icon back">
        <i className="fas fa-arrow-circle-left"></i>
      </div>
      <div className="icon home" onClick={goHome}>
        <i className="fas fa-home"></i>
      </div>
    </div>
  );
}