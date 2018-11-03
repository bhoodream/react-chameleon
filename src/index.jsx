import React, { PureComponent } from 'react';
import pt from 'prop-types';
import ImageParser from 'react-image-parser';

import parseColorsFromData from './parseColorsFromData';
import adaptFrontColorToBackColor from './adaptFrontColorToBackColor';
import { getDisplayName } from './utils';

import {
    SORT_TYPE_COUNT,
    SORT_DIR_DESC,
    COLOR_ALPHA_PRECISION,
    COLOR_DIFFERENCE_DEFAULT
} from './Const';

const ReactChameleon = WrappedComponent => {
    class ReactChameleon extends PureComponent {
        constructor(...args) {
            super(...args);

            this.state = {};
        }

        onImageParsed = ({ data }) => {
            parseColorsFromData({
                ...this.props,
                onColorsParsed: this.onColorsParsed
            }, data);
        };

        onColorsParsed = colors => {
            let chmlnColors = colors
                .slice(...(typeof this.props.colorsCount === 'number' ? [0, this.props.colorsCount] : [0]));

            if (this.props.adaptFrontColorsToBack) {
                const [backColor, ...frontColors] = chmlnColors;

                chmlnColors = [
                    backColor,
                    ...frontColors.map(c => adaptFrontColorToBackColor(backColor, c))
                ];
            }

            this.setState({
                colors: chmlnColors
            });
        };

        render() {
            const {
                children
            } = this.props;
            const {
                colors
            } = this.state;

            return (<div>
                <ImageParser
                    {...this.props}
                    onImageParsed={this.onImageParsed}
                />
                <WrappedComponent
                    {...this.props}
                    reactChameleonColors={colors}
                >
                    {children}
                </WrappedComponent>
            </div>);
        }
    }

    ReactChameleon.displayName = `ReactChameleon(${getDisplayName(WrappedComponent)})`;
    ReactChameleon.propTypes = {
        img: pt.string.isRequired,
        sortType: pt.string,
        sortDir: pt.string,
        minColorAlpha: pt.number,
        colorAlphaPrecision: pt.number,
        colorDifference: pt.number,
        adaptFrontColorsToBack: pt.bool,
        colorsCount: pt.number
    };
    ReactChameleon.defaultProps = {
        sortType: SORT_TYPE_COUNT,
        sortDir: SORT_DIR_DESC,
        minColorAlpha: 0,
        colorAlphaPrecision: COLOR_ALPHA_PRECISION,
        colorDifference: COLOR_DIFFERENCE_DEFAULT,
        adaptFrontColorsToBack: false
    };

    return ReactChameleon;
};

export default ReactChameleon;