import * as React from "react";
import * as ReactDOM from "react-dom";

import Store, {AppState} from "./store";

//Components
import Dashboard from "./components/dashboard/";

//Render
ReactDOM.render(
  <Store><Dashboard/></Store>, document.getElementById("root"));