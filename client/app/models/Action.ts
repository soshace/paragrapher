"use strict";

export interface Action<T> {
  type: string;
  payload: T;
};
