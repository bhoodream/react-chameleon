import sortColors from "./sortColors";
import { COLOR_VAL_MAX } from "./Const";

function getColorAlpha(data, index, precision) {
    const alpha = 3;

    return Math.round((data[index + alpha] / COLOR_VAL_MAX) * precision) / precision;
}

function getRgbaKey(data, index, alpha) {
    const red = 0, green = 1, blue = 2;

    return [data[index + red], data[index + green], data[index + blue], alpha].join(',');
}

function getColorObj(colorsArr, rgbaKey, alpha) {
    let color = colorsArr[rgbaKey];

    if (color) {
        color.count += 1;

        return color;
    }

    return { rgbaKey, alpha, count: 1 };
}

export default (props, data = []) => {
    const {
        minColorAlpha,
        colorAlphaPrecision,
        colorDifference,
        sortType,
        sortDir,
        onColorsParsed
    } = props;
    const dataLen = data.length;
    const rgbaKeyArrMirror = {};
    const rgbaKeyArr = [];
    const colorStep = 4;

    for (let i = 0; i < dataLen; i += colorStep) {
        const colorAlpha =  getColorAlpha(data, i, colorAlphaPrecision);
        const isAlphaOk = colorAlpha > 0 && colorAlpha >= minColorAlpha;

        if (!isAlphaOk) {
            continue;
        }

        const rgbaKey = getRgbaKey(data, i, colorAlpha);

        rgbaKeyArrMirror[rgbaKey] = getColorObj(rgbaKeyArrMirror, rgbaKey, colorAlpha);

        if (rgbaKeyArrMirror[rgbaKey].count === 1) {
            rgbaKeyArr.push(rgbaKeyArrMirror[rgbaKey]);
        }
    }

    const sortedColors = sortColors({ sortType, sortDir }, rgbaKeyArr);
    const colors = [];
    const usedColors = [];

    sortedColors.forEach(colorItem => {
        let rgbaArr = colorItem.rgbaKey.split(',').map(Number),
            isValid = true;

        for (let l = 0; l < usedColors.length; l += 1) {
            let colorDiff = 0,
                usedRgbaArr = usedColors[l].split(',');

            for (let m = 0; m < 3; m += 1) {
                colorDiff += Math.abs(rgbaArr[m] - usedRgbaArr[m]);
            }

            if (colorDiff <= colorDifference) {
                isValid = false;

                break;
            }
        }

        if (isValid) {
            usedColors.push(colorItem.rgbaKey);
            colors.push(colorItem);
        }
    });

    onColorsParsed(colors);
};