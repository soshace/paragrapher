"use strict";

export interface Location {
  pathname: string;
  state?: any;
  search: string;
  key: string;
  hash?: string;
}
