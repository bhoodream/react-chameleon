"use strict";

require("core-js/modules/es.array.sort");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Const = require("./Const");

const allowSortTypes = [_Const.SORT_TYPE_COUNT, _Const.SORT_TYPE_ALPHA];

function _default(_ref, colors) {
  let {
    sortType,
    sortDir
  } = _ref;

  if (allowSortTypes.indexOf(sortType) === -1) {
    console.warn('Unknown sort type!', sortType, colors);
    return colors;
  }

  const getSortByType = type => (a, b) => sortDir === _Const.SORT_DIR_DESC ? b[type] - a[type] : a[type] - b[type];

  return colors.sort(getSortByType(sortType));
}