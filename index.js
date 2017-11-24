import React, { PureComponent } from 'react';

import parseImageColors from './src/parseImageColors';

const ReactChameleon = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props);

            const { img } = props;
            const colors = parseImageColors(img);

            this.state = {
                colors
            }
        }
        render() {
            return <WrappedComponent
                {...this.props}
            />;
        }
    };
};

export default ReactChameleon;