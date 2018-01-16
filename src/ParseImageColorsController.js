import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Color from 'color';

import CanvasController from './CanvasController';
import sortColors from './sortColors';

import {
    COLOR_ALPHA,
    COLOR_ALPHA_PRECISION,
    COLOR_DIFFERENCE,
    SORT_TYPE_MAIN,
    COLOR_VAL
} from "./Const";

class ParseImageColorsController extends PureComponent {
    static propTypes = {
        img: PropTypes.string.isRequired,
        onColorsParsed: PropTypes.func,
        colorAlpha: PropTypes.number,
        colorDifference: PropTypes.number,
        sortType: PropTypes.string
    };

    static defaultProps = {
        img: '',
        onColorsParsed: () => {
        },
        colorAlpha: COLOR_ALPHA,
        colorDifference: COLOR_DIFFERENCE,
        sortType: SORT_TYPE_MAIN
    };

    constructor(...args) {
        super(...args);

        const {img} = this.props;

        this.state = {
            img
        };

        this.onImgLoad = this.onImgLoad.bind(this);
        this.parseColorsFromData = this.parseColorsFromData.bind(this);
    }

    parseColorsFromData(data = []) {
        const {
            colorAlpha,
            colorDifference,
            sortType,
            onColorsParsed
        } = this.props;
        const dataLen = data.length;
        const rgbaKeyArrMirror = {};
        const rgbaKeyArr = [];
        const imgColors = [];
        const usedColors = [];
        const red = 0, green = 1, blue = 2, alpha = 3, colorStep = 4;

        for (let i = 0; i < dataLen; i += colorStep) {
            const dataAlpha = Math.round(
                (data[i + alpha] / COLOR_VAL) * COLOR_ALPHA_PRECISION
            ) / COLOR_ALPHA_PRECISION;
            const isAlphaOk =
                dataAlpha > 0
                && dataAlpha >= colorAlpha;

            if (isAlphaOk) {
                const rgbaKey = [
                    data[i + red],
                    data[i + green],
                    data[i + blue],
                    dataAlpha
                ].join(',');

                if (rgbaKeyArrMirror[rgbaKey]) {
                    rgbaKeyArrMirror[rgbaKey].count += 1
                } else {
                    rgbaKeyArrMirror[rgbaKey] = { rgbaKey, count: 1 };
                    rgbaKeyArr.push(rgbaKeyArrMirror[rgbaKey]);
                }
            }
        }

        const sortedColors = sortColors(sortType, rgbaKeyArr);

        sortedColors.forEach(colorItem => {
            let rgbaArr = colorItem.rgbaKey.split(',').map(Number),
                isValid = true;

            for (let l = 0; l < usedColors.length; l += 1) {
                let colorDiff = 0,
                    usedRgbaArr = usedColors[l].split(',');

                for (let m = 0; m < 3; m += 1) {
                    colorDiff += Math.abs(rgbaArr[m] - usedRgbaArr[m]);
                }

                if (colorDiff <= colorDifference) {
                    isValid = false;

                    break;
                }
            }

            if (isValid) {
                const color = Color(rgbaArr);

                usedColors.push(colorItem.rgbaKey);
                imgColors.push(color);
            }
        });

        onColorsParsed(imgColors);
    }

    onImgLoad(e) {
        const imgElem = e.target;

        this.setState({
            imgElem
        });
    }

    render() {
        const {
            img,
            imgElem
        } = this.state;

        return (
            <div>
                {imgElem && <CanvasController
                    imgElem={imgElem}
                    onImageData={this.parseColorsFromData}
                />}
                {img && <img
                    src={img}
                    alt={'ParseImageColorsController img'}
                    style={{display: 'none'}}
                    onLoad={this.onImgLoad}
                />}
            </div>
        );
    }
}

export default ParseImageColorsController;