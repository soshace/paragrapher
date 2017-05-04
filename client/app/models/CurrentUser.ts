"use strict";

import axios from "axios";

interface Params {

}

class CurrentUser {

  static register(username: string, password: string, email: string) {
    return axios.post(`${CONFIG.backendUrl}/auth/register`, { username, password, email })
    .then(function({ data }) {
      return data;
    });
  }

  static login(username: string, password: string) {
    return axios.post(`${CONFIG.backendUrl}/auth/login`, { username, password })
    .then(function({ data }) {
      return data;
    });
  }

  constructor() {

  }

}
