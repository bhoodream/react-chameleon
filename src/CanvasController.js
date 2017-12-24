import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class CanvasController extends PureComponent {
    static propTypes = {
        sideSize: PropTypes.number,
        imgElem: PropTypes.instanceOf(Element).isRequired,
        onDraw: PropTypes.func
    };

    static defaultProps = {
        sideSize: 400,
        imgElem: null,
        onDraw: () => {}
    };

    componentDidMount() {
        this.drawImage();
    }

    getCanvasSideSizes({ width, height }) {
        const { sideSize } = this.props;
        const widthIsBigger = Math.max(width, height) === width;
        const sides = {};

        sides.width = widthIsBigger ? sideSize : width * (sideSize / height);
        sides.height = widthIsBigger ? height * (sideSize / width) : sideSize;

        return sides;
    }

    drawImage() {
        const {
            imgElem
        } = this.props;
        const { width, height } = this.getCanvasSideSizes(imgElem || {});
        const ctx = this.canvas.getContext("2d");

        this.canvas = Object.assign(this.canvas, { width, height });

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(imgElem, 0, 0, width, height);
    }

    render() {
        return <canvas
            ref={canvas => this.canvas = canvas}
        />;
    }
}

export default CanvasController;