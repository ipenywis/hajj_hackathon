import * as React from "react";

//Store State Wrapper
import {CommonProps} from "../common";

export interface DashboardProps extends CommonProps {};

interface DashboardState {}

export default class Dashboard extends React.Component < DashboardProps,
DashboardState > {

  constructor(props : DashboardProps) {
    super(props);
    this.state = {
      //NOTHING
    };
  }

  render() {
    return (
      <div className="dashboard-container">
        <SelectLanguage languages={this.props.appState.languages}/>
      </div>
    );

  }

}

//Language Selection
export interface Language {
  code : string;
  name : string;
  logo : string;
}

interface SelectLanguageProps {
  languages : Language[];
};
const SelectLanguage : React.SFC < SelectLanguageProps > = (props : SelectLanguageProps) => {
  const {languages} = props;

  const onChooseLanguage = (e : React.MouseEvent, langCode : string) => {
    console.log("You Have Chosen: ", langCode);
  };

  return (
    <div className="dh-languages-container">
      {languages.map((language, idx) => {
        return <div
          className="dh-language"
          key={idx}
          onClick={(e) => onChooseLanguage(e, language.code)}>{language.name}</div>;
      })}
    </div>
  );
};