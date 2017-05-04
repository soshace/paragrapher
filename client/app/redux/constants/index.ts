"use strict";

export * from "./States";
export * from "./Router";
export * from "./Resource";
export * from "./Notifications";
export * from "./Documents";
export * from "./Paragraphs";
export * from "./CurrentUser";

export const EMPTY_EVENT = "EMPTY_EVENT";

export function join(...constants: string[]) {
  return constants.join("_");
};
