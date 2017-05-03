"use strict";

export function parseAxioError(err: any) {
  if(err.response && err.response.data && err.response.data.message ) {
    err = new Error(err.response.data.message);
  }
  return err;
}

export function getField(object: any, fieldPath: string) : any {
  const fieldPathSplitted: string[] = fieldPath.split(".");
  const root = fieldPathSplitted.shift();
  if(fieldPathSplitted.length > 0 && object[root] !== undefined && object[root] !== null) {
    return getField(object[root], fieldPathSplitted.join("."));
  } else {
    return object[root];
  }
};

export function parseQueryString() {
  const query: any = {};
  const qstr = window.location.search;
  const a = (qstr[0] == "?" ? qstr.substr(1) : qstr).split("&");
  for (let i = 0; i < a.length; i++) {
      const b = a[i].split("=");
      const key = decodeURIComponent(b[0]);
      query[key] = decodeURIComponent(b[1] || "");
  }
  return query;
};

