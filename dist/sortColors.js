"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref, colors) {
    var sortType = _ref.sortType,
        sortDir = _ref.sortDir;

    if (allowSortTypes.indexOf(sortType) === -1) {
        console.warn('Unknown sort type!', sortType, colors);

        return colors;
    }

    var getSortByType = function getSortByType(type) {
        return function (a, b) {
            return sortDir === _Const.SORT_DIR_DESC ? b[type] - a[type] : a[type] - b[type];
        };
    };

    return colors.sort(getSortByType(sortType));
};

var _Const = require("./Const");

var allowSortTypes = [_Const.SORT_TYPE_COUNT, _Const.SORT_TYPE_ALPHA];