"use strict";

import { currentUserReducer, defaultState as currentUser, State as CurrentUserState } from "./currentUser";
import { routerReducer, defaultState as router, State as RouterState } from "./router";
import { notificationsReducer, defaultState as notifications, State as NotificationsState } from "./notifications";
import { documentsReducer, defaultState as documents, State as DocumentsState } from "./documents";
import { paragraphsReducer, defaultState as paragraphs, State as ParagraphsState } from "./paragraphs";

export const reducers = {
  currentUser: currentUserReducer,
  router: routerReducer,
  notifications: notificationsReducer,
  documents: documentsReducer,
  paragraphs: paragraphsReducer
};

export const state = {
  currentUser,
  router,
  notifications,
  documents,
  paragraphs
};

export interface ReduxState {
  currentUser: CurrentUserState;
  router: RouterState;
  notifications: NotificationsState;
  documents: DocumentsState;
  paragraphs: ParagraphsState;
};
