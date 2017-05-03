"use strict";

import * as React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";
import MultipleMonitors from "redux-devtools-multiple-monitors";
import Dispatcher from "redux-devtools-dispatch";

const DevTools: any = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={ false }>
    <MultipleMonitors>
      <LogMonitor theme="tomorrow" preserveScrollTop={false} />
      <Dispatcher />
    </MultipleMonitors>
  </DockMonitor>
);


export  function getDevTools() {
  return DevTools;
};
