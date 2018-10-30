'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImageParser = require('react-image-parser');

var _reactImageParser2 = _interopRequireDefault(_reactImageParser);

var _parseColorsFromData = require('./parseColorsFromData');

var _parseColorsFromData2 = _interopRequireDefault(_parseColorsFromData);

var _adaptFrontColorToBackColor = require('./adaptFrontColorToBackColor');

var _adaptFrontColorToBackColor2 = _interopRequireDefault(_adaptFrontColorToBackColor);

var _utils = require('./utils');

var _Const = require('./Const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactChameleon = function ReactChameleon(WrappedComponent) {
    var ReactChameleon = function (_PureComponent) {
        _inherits(ReactChameleon, _PureComponent);

        function ReactChameleon() {
            var _ref;

            _classCallCheck(this, ReactChameleon);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_ref = ReactChameleon.__proto__ || Object.getPrototypeOf(ReactChameleon)).call.apply(_ref, [this].concat(args)));

            _this.onImageParsed = function (data) {
                (0, _parseColorsFromData2.default)(_extends({}, _this.props, {
                    onColorsParsed: _this.onColorsParsed
                }), data);
            };

            _this.onColorsParsed = function (colors) {
                var chmlnColors = colors.slice.apply(colors, _toConsumableArray(typeof _this.props.colorsCount === 'number' ? [0, _this.props.colorsCount] : [0]));

                if (_this.props.adaptFrontColorsToBack) {
                    var _chmlnColors = chmlnColors,
                        _chmlnColors2 = _toArray(_chmlnColors),
                        backColor = _chmlnColors2[0],
                        frontColors = _chmlnColors2.slice(1);

                    console.log(chmlnColors);

                    chmlnColors = [backColor].concat(_toConsumableArray(frontColors.map(function (c) {
                        return (0, _adaptFrontColorToBackColor2.default)(backColor, c);
                    })));
                }

                _this.setState({
                    colors: chmlnColors
                });
            };

            _this.state = {};
            return _this;
        }

        _createClass(ReactChameleon, [{
            key: 'render',
            value: function render() {
                var children = this.props.children;
                var colors = this.state.colors;


                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactImageParser2.default, _extends({}, this.props, {
                        onImageParsed: this.onImageParsed
                    })),
                    _react2.default.createElement(
                        WrappedComponent,
                        _extends({}, this.props, {
                            reactChameleonColors: colors
                        }),
                        children
                    )
                );
            }
        }]);

        return ReactChameleon;
    }(_react.PureComponent);

    ReactChameleon.displayName = 'ReactChameleon(' + (0, _utils.getDisplayName)(WrappedComponent) + ')';
    ReactChameleon.propTypes = {
        img: _propTypes2.default.string.isRequired,
        sortType: _propTypes2.default.string,
        sortDir: _propTypes2.default.string,
        minColorAlpha: _propTypes2.default.number,
        colorAlphaPrecision: _propTypes2.default.number,
        colorDifference: _propTypes2.default.number,
        adaptFrontColorsToBack: _propTypes2.default.bool,
        colorsCount: _propTypes2.default.number
    };
    ReactChameleon.defaultProps = {
        sortType: _Const.SORT_TYPE_COUNT,
        sortDir: _Const.SORT_DIR_DESC,
        minColorAlpha: 0,
        colorAlphaPrecision: _Const.COLOR_ALPHA_PRECISION,
        colorDifference: _Const.COLOR_DIFFERENCE_DEFAULT,
        adaptFrontColorsToBack: false
    };

    return ReactChameleon;
};

exports.default = ReactChameleon;