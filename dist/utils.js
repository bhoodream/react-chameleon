'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getDisplayName = getDisplayName;
exports.getColorObjFromRGBAString = getColorObjFromRGBAString;
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function getColorObjFromRGBAString(rgbaKey, paramAlpha) {
    var _rgbaKey$split$map = rgbaKey.split(',').map(function (val) {
        return Number(String(val).trim());
    }),
        _rgbaKey$split$map2 = _slicedToArray(_rgbaKey$split$map, 4),
        r = _rgbaKey$split$map2[0],
        g = _rgbaKey$split$map2[1],
        b = _rgbaKey$split$map2[2],
        _rgbaKey$split$map2$ = _rgbaKey$split$map2[3],
        alpha = _rgbaKey$split$map2$ === undefined ? paramAlpha : _rgbaKey$split$map2$;

    return { r: r, g: g, b: b, alpha: alpha, count: 1 };
}