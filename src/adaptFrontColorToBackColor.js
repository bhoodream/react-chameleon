import { getColorObjFromRGBAString } from './utils';

import {
    COLOR_VAL_MAX,
    READABLE_LUM_DIFF,
    READABLE_TRY_LIMIT,
    READABLE_ALPHA,
    LUM_STEP
} from './Const';

const getLum = c => {
    const R = 0.2126;
    const G = 0.7152;
    const B = 0.0722;
    const A = 255;
    const P = 2.2;

    return R * Math.pow(c.r / A, P) + G * Math.pow(c.g / A, P) + B * Math.pow(c.b / A, P);
};

const lumDiff = (rgb1, rgb2) => {
    const l1 = getLum(rgb1);
    const l2 = getLum(rgb2);
    const G = 0.05;

    return l1 > l2 ? (l1 + G) / (l2 + G) : (l2 + G) / (l1 + G);
};

const adjustColorLum = (color, lum = 0) => {
    const newColor = { ...color };
    const r = newColor.r;
    const g = newColor.g;
    const b = newColor.b;

    newColor.r = Math.round(Math.min(Math.max(0, r + (r * lum)), COLOR_VAL_MAX));
    newColor.g = Math.round(Math.min(Math.max(0, g + (g * lum)), COLOR_VAL_MAX));
    newColor.b = Math.round(Math.min(Math.max(0, b + (b * lum)), COLOR_VAL_MAX));

    return newColor;
};

const findReadableColor = (
    backColor,
    frontColor,
    lumDir,
    limit,
    minAlpha
) => {
    let newFrontColor = { ...frontColor };
    let tryCount = 1;

    while (lumDiff(backColor, newFrontColor) < READABLE_LUM_DIFF) {
        if (tryCount > limit) break;

        newFrontColor = adjustColorLum(newFrontColor, lumDir * LUM_STEP * tryCount);

        tryCount++;
    }

    if (newFrontColor.alpha < minAlpha) {
        newFrontColor.alpha = minAlpha;
    }

    return tryCount > limit ?
        getColorObjFromRGBAString(lumDir < 0 ? '0,0,0,1' : '255,255,255,1') :
        newFrontColor;
};

export default (backColor, frontColor, limit = READABLE_TRY_LIMIT, minAlpha = READABLE_ALPHA) => {
    if (lumDiff(backColor, frontColor) >= READABLE_LUM_DIFF && frontColor.alpha >= minAlpha) {
        return frontColor;
    }

    let lumDir = 1;

    if (lumDiff(backColor, getColorObjFromRGBAString('0,0,0,1')) >= READABLE_LUM_DIFF) {
        lumDir = -1;
    }

    return findReadableColor(backColor, frontColor, lumDir, limit, minAlpha);
};
