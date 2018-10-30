export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function getColorObjFromRGBAString(rgbaKey, paramAlpha) {
    const [r, g, b, alpha = paramAlpha] = rgbaKey
        .split(',')
        .map(val => Number(String(val).trim()));

    return { r, g, b, alpha, count: 1 };
}