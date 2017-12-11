import React, { PureComponent } from 'react';

import parseImageColors from './src/parseImageColors';

const ReactChameleon = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props);

            const { img } = props;
            const colors = parseImageColors(img);

            this.state = {
                img,
                colors
            }
        }
        render() {
            return (<div>
                <img src={this.state.img} />
                <WrappedComponent
                    {...this.props}
                />
            </div>);
        }
    };
};

export default ReactChameleon;