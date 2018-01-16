import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { CANVAS_SIDE_DEFAULT } from "./Const";

class CanvasController extends PureComponent {
    static propTypes = {
        sideSize: PropTypes.number,
        imgElem: PropTypes.instanceOf(Element).isRequired,
        onImageData: PropTypes.func
    };

    static defaultProps = {
        sideSize: CANVAS_SIDE_DEFAULT,
        imgElem: null,
        onImageData: () => {}
    };

    componentDidMount() {
        this.getImageData();
    }

    getCanvasSideSizes({ width = 0, height = 0 }) {
        const { sideSize } = this.props;
        const widthIsBigger = width > height;

        return {
            width: widthIsBigger ? sideSize : width * (sideSize / height),
            height: widthIsBigger ? height * (sideSize / width) : sideSize
        };
    }

    getImageData() {
        const {
            imgElem,
            onImageData
        } = this.props;
        const { width, height } = this.getCanvasSideSizes(imgElem || {});
        const ctx = this.canvas.getContext("2d");
        let imageData = [];

        this.canvas = Object.assign(this.canvas, { width, height });

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(imgElem, 0, 0, width, height);

        try {
            imageData = ctx.getImageData(0, 0, width, height).data;
        } catch (e) {
            console.error('CanvasController: catch error on getImageData!', e);
        }

        onImageData(imageData);
    }

    render() {
        return <canvas
            style={{display: 'none'}}
            ref={canvas => this.canvas = canvas}
        />;
    }
}

export default CanvasController;