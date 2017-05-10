"use strict";

import axios from "axios";
import { pick } from "underscore";

interface Params {
  email: string;
  username: string;
  id: number;
  first_name: string;
  last_name: string;
  location: {
    type: string;
    coordinates: number[];
  };
  address: string;
  gender: number;
  dob: any;
  photo: string;
  bio: string;
  auth_token: string;
}

export class CurrentUser {

  static register(username: string, password: string, email: string) {
    return axios.post(`${CONFIG.backendUri}/auth/register/`, { username, password, email })
    .then(function({ data }) {
      return new CurrentUser(data);
    });
  }

  static login(username: string, password: string) {
    return axios.post(`${CONFIG.backendUri}/auth/login/`, { username, password })
    .then(function({ data }) {
      localStorage.setItem("auth_token", data.auth_token);
      return new CurrentUser(data);
    });
  }

  static get() {
    const config = { headers: CurrentUser.getAuthHeader() };
    console.log(config);
    return axios.get(`${CONFIG.backendUri}/auth/me/`, config)
    .then(function({ data }) {
      return new CurrentUser(data);
    })
    .catch(function(err) {
      if(err.response.status == 401) {
        return null;
      } else {
        return err;
      }
    })
    .then(function(result) {
      if(result instanceof Error) {
        throw result;
      }
      return result;
    });
  }

  static getAuthHeader() {
    const authToken = localStorage.getItem("auth_token");
    return {"Authorization": `Token ${ authToken }` };
  }

  static fields = [ "id", "email", "username", "password", "location", "address", "gender", "dob", "photo", "bio" ];

  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  location: {
    type: string;
    coordinates: number[];
  };
  address: string;
  gender: number;
  dob: any;
  photo: string;
  bio: string;
  authToken: string;

  constructor(params: Params) {
    this.id = params.id;
    this.email = params.email;
    this.username = params.username;
    this.firstName = params.first_name;
    this.lastName = params.last_name;
    this.location = params.location;
    this.address = params.address;
    this.gender = params.gender;
    this.dob = params.dob;
    this.photo = params.photo;
    this.bio = params.bio;
    this.authToken = params.auth_token;
    this.password = params.password;
  }

  toJSON() {
    const result = pick(this, CurrentUser.fields);
    result.firstName = this.firstName;
    result.lastName = this.lastName;
    result.authToken = this.authToken;
    return result;
  }

}
