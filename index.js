import React, { PureComponent } from 'react';
import ParseImageColorsController from './src/ParseImageColorsController';

import { getDisplayName } from './src/util';

const ReactChameleon = WrappedComponent => {
    class ReactChameleon extends PureComponent {
        // constructor(...args) {
        //     super(...args);
        // }

        onColorsParsed(colors) {
            console.log(colors);

            this.setState({
                colors
            })
        }

        render() {
            const {
                img,
                children
            } = this.props;

            console.log(children);

            return (<div>
                <ParseImageColorsController img={img} onImgLoad={this.onColorsParsed} />
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