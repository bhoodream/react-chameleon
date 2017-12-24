import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';

import CanvasController from './CanvasController';
import sortColors from './sortColors';

import {
    COLOR_ALPHA,
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
        onColorsParsed: () => {},
        colorAlpha: COLOR_ALPHA,
        colorDifference: COLOR_DIFFERENCE,
        sortType: SORT_TYPE_MAIN
    };

    constructor(...args) {
        super(...args);

        const { img } = this.props;

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
        const rgbaKeyArr = [];
        const imgColors = [];
        const usedColors = [];

        for (let i = 0; i < dataLen; i += 4) {
            const isAlphaOk = data[i + 3] > 0 && data[i + 3] >= colorAlpha * COLOR_VAL;

            if (isAlphaOk) {
                const rgbaKey = [data[i], data[i + 1], data[i + 2], data[i + 3]].join(',');

                if (rgbaKeyArr[rgbaKey]) {
                    rgbaKeyArr[rgbaKey] += 1
                } else {
                    rgbaKeyArr[rgbaKey] = 1
                }
            }
        }

        const sortedColors = sortColors(sortType, rgbaKeyArr);

        for (let rgbaStr in sortedColors) {
            if (sortedColors.hasOwnProperty(rgbaStr)) {
                let rgbaArr = rgbaStr.split(',').map(Number),
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
                    const color = Color.rgb(rgbaArr.slice(0, 3)).alpha(rgbaArr[3] / COLOR_VAL);

                    usedColors.push(rgbaStr);
                    imgColors.push(color);
                }
            }
        }

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
                    onLoad={this.onImgLoad}
                />}
            </div>
        );
    }
}

export default ParseImageColorsController;