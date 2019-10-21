"use strict";

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayName = getDisplayName;
exports.getColorObjFromRGBAString = getColorObjFromRGBAString;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function getColorObjFromRGBAString(rgbaKey, paramAlpha) {
  const [r, g, b, alpha = paramAlpha] = rgbaKey.split(',').map(val => Number(String(val).trim()));
  return {
    r,
    g,
    b,
    alpha,
    count: 1
  };
}