"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImageParser = _interopRequireDefault(require("react-image-parser"));

var _parseColorsFromData = _interopRequireDefault(require("./parseColorsFromData"));

var _adaptFrontColorToBackColor = _interopRequireDefault(require("./adaptFrontColorToBackColor"));

var _utils = require("./utils");

var _Const = require("./Const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const cachedImagesColors = [];
const COLORS_CACHE_LIMIT = 100;

const getColorsCacheKey = props => {
  const {
    img,
    colorDifference,
    adaptFrontColorsToBack,
    colorsCount
  } = props;
  return "".concat(img).concat(colorDifference).concat(adaptFrontColorsToBack).concat(colorsCount);
};

const getCachedColors = cacheKey => {
  const {
    colors
  } = cachedImagesColors.filter(i => i.cacheKey === cacheKey)[0] || {};
  return colors;
};

const ReactChameleon = WrappedComponent => {
  class ReactChameleon extends _react.PureComponent {
    constructor() {
      super(...arguments);

      _defineProperty(this, "onImageParsed", (_ref) => {
        let {
          data
        } = _ref;
        (0, _parseColorsFromData.default)(_objectSpread({}, this.props, {
          onColorsParsed: this.onColorsParsed
        }), data);
      });

      _defineProperty(this, "onColorsParsed", colors => {
        let chmlnColors = colors.slice(...(typeof this.props.colorsCount === 'number' ? [0, this.props.colorsCount] : [0]));

        if (this.props.adaptFrontColorsToBack) {
          const [backColor, ...frontColors] = chmlnColors;
          chmlnColors = [backColor, ...frontColors.map(c => (0, _adaptFrontColorToBackColor.default)(backColor, c))];
        }

        this.cacheColors(chmlnColors);
        this.setState({
          colors: chmlnColors
        });
      });

      this.state = {};
    }

    cacheColors(colors) {
      const cacheKey = getColorsCacheKey(this.props);

      if (getCachedColors(cacheKey)) {
        return;
      }

      if (cachedImagesColors.length > this.props.colorsCacheLimit) {
        cachedImagesColors.shift();
      }

      cachedImagesColors.push({
        cacheKey,
        colors
      });
    }

    render() {
      const {
        children
      } = this.props;
      const {
        colors = getCachedColors(getColorsCacheKey(this.props))
      } = this.state;
      return _react.default.createElement("div", null, !colors && _react.default.createElement(_reactImageParser.default, _extends({}, this.props, {
        onImageParsed: this.onImageParsed
      })), _react.default.createElement(WrappedComponent, _extends({}, this.props, {
        reactChameleonColors: colors
      }), children));
    }

  }

  ReactChameleon.displayName = "ReactChameleon(".concat((0, _utils.getDisplayName)(WrappedComponent), ")");
  ReactChameleon.propTypes = {
    img: _propTypes.default.string.isRequired,
    colorsCacheLimit: _propTypes.default.number,
    sortType: _propTypes.default.string,
    sortDir: _propTypes.default.string,
    minColorAlpha: _propTypes.default.number,
    colorAlphaPrecision: _propTypes.default.number,
    colorDifference: _propTypes.default.number,
    adaptFrontColorsToBack: _propTypes.default.bool,
    colorsCount: _propTypes.default.number
  };
  ReactChameleon.defaultProps = {
    colorsCacheLimit: COLORS_CACHE_LIMIT,
    sortType: _Const.SORT_TYPE_COUNT,
    sortDir: _Const.SORT_DIR_DESC,
    minColorAlpha: 0,
    colorAlphaPrecision: _Const.COLOR_ALPHA_PRECISION,
    colorDifference: _Const.COLOR_DIFFERENCE_DEFAULT,
    adaptFrontColorsToBack: false
  };
  return ReactChameleon;
};

var _default = ReactChameleon;
exports.default = _default;