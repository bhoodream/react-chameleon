import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CanvasController from './CanvasController';

class ParseImageColorsController extends PureComponent {
    static propTypes = {
        img: PropTypes.string.isRequired
    };

    static defaultProps = {
        img: ''
    };

    constructor(...args) {
        super(...args);

        const { img } = this.props;

        this.state = {
            img
        };

        this.onImgLoad = this.onImgLoad.bind(this);
    }

    onImgLoad(e) {
        const imgElem = e.target;

        this.setState({
            imgElem
        });
    }

    onCanvasDraw(data) {
        console.log(data);
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
                    onDraw={this.onCanvasDraw}
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