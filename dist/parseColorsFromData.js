"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sortColors = require("./sortColors");

var _sortColors2 = _interopRequireDefault(_sortColors);

var _utils = require("./utils");

var _Const = require("./Const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getColorAlpha(data, index, precision) {
    var alpha = 3;

    return Math.round(data[index + alpha] / _Const.COLOR_VAL_MAX * precision) / precision;
}

function getRgba(data, index, alpha) {
    var red = 0,
        green = 1,
        blue = 2;

    return [data[index + red], data[index + green], data[index + blue], alpha];
}

exports.default = function (props) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var minColorAlpha = props.minColorAlpha,
        colorAlphaPrecision = props.colorAlphaPrecision,
        colorDifference = props.colorDifference,
        sortType = props.sortType,
        sortDir = props.sortDir,
        onColorsParsed = props.onColorsParsed;

    var dataLen = data.length;
    var rgbaKeyArrMirror = {};
    var rgbaKeyArr = [];
    var colorStep = 4;

    for (var i = 0; i < dataLen; i += colorStep) {
        var colorAlpha = getColorAlpha(data, i, colorAlphaPrecision);
        var isAlphaOk = colorAlpha > 0 && colorAlpha >= minColorAlpha;

        if (!isAlphaOk) {
            continue;
        }

        var rgba = getRgba(data, i, colorAlpha);
        var rgbaKey = rgba.join(',');

        if (rgbaKeyArrMirror[rgbaKey]) {
            rgbaKeyArrMirror[rgbaKey].count += 1;
        } else {
            rgbaKeyArrMirror[rgbaKey] = (0, _utils.getColorObjFromRGBAString)(rgbaKey, colorAlpha);
            rgbaKeyArr.push(rgbaKeyArrMirror[rgbaKey]);
        }
    }

    var sortedColors = (0, _sortColors2.default)({ sortType: sortType, sortDir: sortDir }, rgbaKeyArr);
    var colors = [];
    var usedColors = [];

    sortedColors.forEach(function (colorItem) {
        var rgbaArr = [colorItem.r, colorItem.g, colorItem.b, colorItem.alpha],
            isValid = true;

        for (var l = 0; l < usedColors.length; l += 1) {
            var colorDiff = 0,
                usedRgbaArr = usedColors[l];

            for (var m = 0; m < 3; m += 1) {
                colorDiff += Math.abs(rgbaArr[m] - usedRgbaArr[m]);
            }

            if (colorDiff <= colorDifference) {
                isValid = false;

                break;
            }
        }

        if (isValid) {
            usedColors.push(rgbaArr);
            colors.push(colorItem);
        }
    });

    onColorsParsed(colors);
};