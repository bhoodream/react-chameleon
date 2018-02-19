import React, {PureComponent} from 'react';
import Color from 'color';
import ImageParser from '../react-image-parser';

import parseColorsFromData from './src/parseColorsFromData';
import { getDisplayName } from './src/util';

const ReactChameleon = WrappedComponent => {
    class ReactChameleon extends PureComponent {
        state = {};

        constructor(...args) {
            super(...args);

            this.onImageParsed = this.onImageParsed.bind(this);
            this.onColorsParsed = this.onColorsParsed.bind(this);
        }

        onImageParsed(data) {
            parseColorsFromData({
                ...this.props,
                onColorsParsed: this.onColorsParsed
            }, data);
        }

        onColorsParsed(colors) {
            this.setState({
                colors: colors.map(c => {
                    return {
                        ...c,
                        fn: new Color(c.rgbaKey.split(',').map(Number))
                    }
                })
            });
        }

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

    return ReactChameleon;
};

export default ReactChameleon;