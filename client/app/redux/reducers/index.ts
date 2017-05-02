"use strict";

import { routerReducer, defaultState as router, State as RouterState } from "./router";
import { notificationsReducer, defaultState as notifications, State as NotificationsState } from "./notifications";

export const reducers = {
  router: routerReducer,
  notifications: notificationsReducer
};

export const state = {
  router,
  notifications
};

export interface ReduxState {
  router: RouterState;
  notifications: NotificationsState;
};
