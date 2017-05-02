"use strict";

import {
  DOCUMENT,
  PARAGRAPH,
  NOTIFICATION,
  SAVE,
  SUCCESS,
  FAIL,
  HIDE,
  join
} from "../constants";1
import { Notification } from "../../models";

export interface State {
  list: Notification[];
}

export const defaultState: State = { list: [] };

const ACTION_HANDLERS: any = {
  [join(NOTIFICATION, HIDE)]: function(state: State) {
    return { list: state.list.slice(1) };
  }
};

const models = [ DOCUMENT, PARAGRAPH ];
models.forEach(function(type) {
  ACTION_HANDLERS[join(SAVE, type, FAIL)] = errorHandler;
});
models.forEach(function(type) {
  ACTION_HANDLERS[join(SAVE, type, FAIL)] = saveHandler.bind(type);
});

function errorHandler(state: State, action: { payload: Error }): State {
  const notification: Notification = { level: "error", message: action.payload.message };
  const list = [ ...state.list ];
  list.push(notification);
  return { list };
}

function saveHandler(model: string, state: State) {
  const notification: Notification = { level: "info", message: `${model.toLowerCase()} was saved` };
  const list = [ ...state.list ];
  list.push(notification);
  return { list };
}

export function notificationsReducer(state = defaultState, action: { type: string; payload: Error }) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
};
