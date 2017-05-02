"use strict";

import * as React from "react";
import { render } from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import configureStore from "./redux/store";

// injectTapEventPlugin();


// const store = configureStore();

// const rootEl = document.getElementById("root");

// if(process.env.NODE_ENV == "local" && module.hot) {
//   renderDebug();
//   module.hot.accept("./containers/Root", renderDebug);
// } else {
//   const Root = require("./containers/Root").default;
//   render(<Root store={ store } history={ history } /> , rootEl);
// }

// function renderDebug() {
//   const AppContainer = require("react-hot-loader").AppContainer;
//   const Root = require("./containers/Root").default;
//   render(
//     <AppContainer>
//       <Root store={ store } history={ history } />
//     </AppContainer>,
//     rootEl
//   );
// }
