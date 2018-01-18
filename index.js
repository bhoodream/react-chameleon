import React, {PureComponent} from 'react';
import Color from 'color';
import ImageParser from '../react-image-parser';

import {getDisplayName} from './src/util';

const ReactChameleon = WrappedComponent => {
    class ReactChameleon extends PureComponent {
        state = {};

        constructor(...args) {
            super(...args);

            this.onColorsParsed = this.onColorsParsed.bind(this);
        }

        onColorsParsed(colors) {
            const colorItems = colors.map(c => new Color(c));

            this.setState({
                colorItems
            });
        }

        render() {
            const {
                children
            } = this.props;
            const {
                colorItems
            } = this.state;

            return (<div>
                <ImageParser
                    {...this.props}
                    onColorsParsed={this.onColorsParsed}
                />
                <WrappedComponent
                    {...this.props}
                    reactChameleonColors={colorItems}
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