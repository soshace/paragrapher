"use strict";

export interface Page<T> {
  list: T[];
  currentPage: number;
  pagesCount: number;
}
