import * as React from "react";
import * as ReactDOM from "react-dom";

import Store, {AppState} from "./store";

//Components
import Layout from "./components/layout";

//Render
ReactDOM.render(
  <Store><Layout/></Store>, document.getElementById("root"));