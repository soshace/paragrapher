"use strict";

export interface Notification {
  level: "info" | "warn" | "error";
  message: string;
  details?: any;
}
