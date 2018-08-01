import {AppState} from "../store";

//Wrapper Around Store Component's Shared Props
export interface CommonProps {
  appState
    ?
    : AppState,
  setAppState
    ?
    : (newAppState : any) => void;
}
