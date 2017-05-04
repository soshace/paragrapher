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
      return new CurrentUser(data);
    });
  }

  static get() {
    return axios.get(`${CONFIG.backendUri}/auth/me/`)
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

  static fields = [ "id", "email", "username", "location", "address", "gender", "dob", "photo", "bio" ];

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
  }

  toJSON() {
    const result = pick(this, CurrentUser.fields);
    result.firstName = this.firstName;
    result.lastName = this.lastName;
    result.authToken = this.authToken;
    return result;
  }

}
