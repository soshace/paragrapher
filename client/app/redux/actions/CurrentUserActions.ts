"use strict";

import { Dispatch } from "redux";

import {
  READ,
  SAVE,
  START,
  FAIL,
  SUCCESS,
  CURRENT_USER,
  LOGIN_REQUIRED,
  LOG_IN,
  join
} from "../constants";
import { CurrentUser } from "../../models";

export function readCurrentUser() {
  return { type: join(READ, CURRENT_USER), payload: CurrentUser.get() };
};

export function login(username: string, password: string) {
  return { type: join(READ, CURRENT_USER), payload: CurrentUser.login(username, password) };
};

export function register(username: string, password: string, email: string) {
  return { type: join(READ, CURRENT_USER), payload: CurrentUser.register(username, password, email) };
};
