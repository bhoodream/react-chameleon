'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _Const = require('./Const');

var getLum = function getLum(c) {
    var R = 0.2126;
    var G = 0.7152;
    var B = 0.0722;
    var A = 255;
    var P = 2.2;

    return R * Math.pow(c.r / A, P) + G * Math.pow(c.g / A, P) + B * Math.pow(c.b / A, P);
};

var lumDiff = function lumDiff(rgb1, rgb2) {
    var l1 = getLum(rgb1);
    var l2 = getLum(rgb2);
    var G = 0.05;

    return l1 > l2 ? (l1 + G) / (l2 + G) : (l2 + G) / (l1 + G);
};

var adjustColorLum = function adjustColorLum(color) {
    var lum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var newColor = _extends({}, color);
    var r = newColor.r;
    var g = newColor.g;
    var b = newColor.b;

    newColor.r = Math.round(Math.min(Math.max(0, r + r * lum), _Const.COLOR_VAL_MAX));
    newColor.g = Math.round(Math.min(Math.max(0, g + g * lum), _Const.COLOR_VAL_MAX));
    newColor.b = Math.round(Math.min(Math.max(0, b + b * lum), _Const.COLOR_VAL_MAX));

    return newColor;
};

var findReadableColor = function findReadableColor(backColor, frontColor, lumDir, limit, minAlpha) {
    var newFrontColor = _extends({}, frontColor);
    var tryCount = 1;

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

exports.default = function (backColor, frontColor) {
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Const.READABLE_TRY_LIMIT;
    var minAlpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Const.READABLE_ALPHA;

    if (lumDiff(backColor, frontColor) >= _Const.READABLE_LUM_DIFF && frontColor.alpha >= minAlpha) {
        return frontColor;
    }

    var lumDir = 1;

    if (lumDiff(backColor, (0, _utils.getColorObjFromRGBAString)('0,0,0,1')) >= _Const.READABLE_LUM_DIFF) {
        lumDir = -1;
    }

    return findReadableColor(backColor, frontColor, lumDir, limit, minAlpha);
};