"use strict";

export interface Page<T> {
  list: T[];
  previousPage: number;
  nextPage: number;
}
