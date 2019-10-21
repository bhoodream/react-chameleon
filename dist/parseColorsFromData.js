"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sortColors = _interopRequireDefault(require("./sortColors"));

var _utils = require("./utils");

var _Const = require("./Const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getColorAlpha(data, index, precision) {
  const alpha = 3;
  return Math.round(data[index + alpha] / _Const.COLOR_VAL_MAX * precision) / precision;
}

function getRgba(data, index, alpha) {
  const red = 0,
        green = 1,
        blue = 2;
  return [data[index + red], data[index + green], data[index + blue], alpha];
}

var _default = function _default(props) {
  let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const {
    minColorAlpha,
    colorAlphaPrecision,
    colorDifference,
    sortType,
    sortDir,
    onColorsParsed
  } = props;
  const dataLen = data.length;
  const rgbaKeyArrMirror = {};
  const rgbaKeyArr = [];
  const colorStep = 4;

  for (let i = 0; i < dataLen; i += colorStep) {
    const colorAlpha = getColorAlpha(data, i, colorAlphaPrecision);
    const isAlphaOk = colorAlpha > 0 && colorAlpha >= minColorAlpha;

    if (!isAlphaOk) {
      continue;
    }

    const rgba = getRgba(data, i, colorAlpha);
    const rgbaKey = rgba.join(',');

    if (rgbaKeyArrMirror[rgbaKey]) {
      rgbaKeyArrMirror[rgbaKey].count += 1;
    } else {
      rgbaKeyArrMirror[rgbaKey] = (0, _utils.getColorObjFromRGBAString)(rgbaKey, colorAlpha);
      rgbaKeyArr.push(rgbaKeyArrMirror[rgbaKey]);
    }
  }

  const sortedColors = (0, _sortColors.default)({
    sortType,
    sortDir
  }, rgbaKeyArr);
  const colors = [];
  const usedColors = [];
  sortedColors.forEach(colorItem => {
    let rgbaArr = [colorItem.r, colorItem.g, colorItem.b, colorItem.alpha],
        isValid = true;

    for (let l = 0; l < usedColors.length; l += 1) {
      let colorDiff = 0,
          usedRgbaArr = usedColors[l];

      for (let m = 0; m < 3; m += 1) {
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

exports.default = _default;