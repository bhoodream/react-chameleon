import React, {PureComponent} from 'react';
import Color from 'color';
import ImageParser from 'react-image-parser';

import {getDisplayName} from './src/util';

const ReactChameleon = WrappedComponent => {
    class ReactChameleon extends PureComponent {
        state = {};

        constructor(...args) {
            super(...args);

            this.onColorsParsed = this.onColorsParsed.bind(this);
        }

        onColorsParsed(colors) {
            this.setState({
                colors: colors.map(c => new Color(c))
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
                    onColorsParsed={this.onColorsParsed}
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