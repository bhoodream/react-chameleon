"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _Const = require("./Const");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getLum = c => {
  const R = 0.2126;
  const G = 0.7152;
  const B = 0.0722;
  const A = 255;
  const P = 2.2;
  return R * Math.pow(c.r / A, P) + G * Math.pow(c.g / A, P) + B * Math.pow(c.b / A, P);
};

const lumDiff = (rgb1, rgb2) => {
  const l1 = getLum(rgb1);
  const l2 = getLum(rgb2);
  const G = 0.05;
  return l1 > l2 ? (l1 + G) / (l2 + G) : (l2 + G) / (l1 + G);
};

const adjustColorLum = function adjustColorLum(color) {
  let lum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  const newColor = _objectSpread({}, color);

  const r = newColor.r;
  const g = newColor.g;
  const b = newColor.b;
  newColor.r = Math.round(Math.min(Math.max(0, r + r * lum), _Const.COLOR_VAL_MAX));
  newColor.g = Math.round(Math.min(Math.max(0, g + g * lum), _Const.COLOR_VAL_MAX));
  newColor.b = Math.round(Math.min(Math.max(0, b + b * lum), _Const.COLOR_VAL_MAX));
  return newColor;
};

const findReadableColor = (backColor, frontColor, lumDir, limit, minAlpha) => {
  let newFrontColor = _objectSpread({}, frontColor);

  let tryCount = 1;

  while (lumDiff(backColor, newFrontColor) < _Const.READABLE_LUM_DIFF) {
    if (tryCount > limit) break;
    newFrontColor = adjustColorLum(newFrontColor, lumDir * _Const.LUM_STEP * tryCount);
    tryCount++;
  }

  if (newFrontColor.alpha < minAlpha) {
    newFrontColor.alpha = minAlpha;
  }

  return tryCount > limit ? (0, _utils.getColorObjFromRGBAString)(lumDir < 0 ? '0,0,0,1' : '255,255,255,1') : newFrontColor;
};

var _default = function _default(backColor, frontColor) {
  let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Const.READABLE_TRY_LIMIT;
  let minAlpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Const.READABLE_ALPHA;

  if (lumDiff(backColor, frontColor) >= _Const.READABLE_LUM_DIFF && frontColor.alpha >= minAlpha) {
    return frontColor;
  }

  let lumDir = 1;

  if (lumDiff(backColor, (0, _utils.getColorObjFromRGBAString)('0,0,0,1')) >= _Const.READABLE_LUM_DIFF) {
    lumDir = -1;
  }

  return findReadableColor(backColor, frontColor, lumDir, limit, minAlpha);
};

exports.default = _default;