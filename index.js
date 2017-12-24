import React, { PureComponent } from 'react';
import ParseImageColorsController from './src/ParseImageColorsController';

import { getDisplayName } from './src/util';

const ReactChameleon = WrappedComponent => {
    class ReactChameleon extends PureComponent {
        state = {};

        constructor(...args) {
            super(...args);

            this.onColorsParsed = this.onColorsParsed.bind(this);
        }

        onColorsParsed(colors) {
            this.setState({
                colors
            })
        }

        render() {
            const {
                img,
                children
            } = this.props;
            const {
                colors
            } = this.state;

            console.log(colors);

            return (<div>
                <ParseImageColorsController
                    img={img}
                    onColorsParsed={this.onColorsParsed}
                />
                <WrappedComponent
                    {...this.props}
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