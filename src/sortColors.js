import {
    SORT_TYPE_COUNT,
    SORT_TYPE_ALPHA,
    SORT_DIR_DESC
} from "./Const";

const allowSortTypes = [
    SORT_TYPE_COUNT,
    SORT_TYPE_ALPHA
];

export default function ({ sortType, sortDir }, colors) {
    if (allowSortTypes.indexOf(sortType) === -1) {
        console.warn('Unknown sort type!', sortType, colors);

        return colors;
    }

    const sortByType = type => (a, b) =>  sortDir === SORT_DIR_DESC ?
        b[type] - a[type] :
        a[type] - b[type];

    return colors.sort(sortByType(sortType));
}