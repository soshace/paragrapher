"use strict";

import { routerReducer, defaultState as router, State as RouterState } from "./router";
import { notificationsReducer, defaultState as notifications, State as NotificationsState } from "./notifications";
import { documentsReducer, defaultState as documents, State as DocumentsState } from "./documents";
import { paragraphsReducer, defaultState as paragraphs, State as ParagraphsState } from "./paragraphs";

export const reducers = {
  router: routerReducer,
  notifications: notificationsReducer,
  documents: documentsReducer,
  paragraphs: paragraphsReducer
};

export const state = {
  router,
  notifications,
  documents,
  paragraphs
};

export interface ReduxState {
  router: RouterState;
  notifications: NotificationsState;
  documents: DocumentsState;
  paragraphs: ParagraphsState;
};
