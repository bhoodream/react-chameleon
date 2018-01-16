import { SORT_TYPE_MAIN } from "./Const";

export default function (sortType, colors) {
    switch (sortType) {
        case SORT_TYPE_MAIN:
            return colors.sort((a, b) =>  b.count - a.count);

        default:
            console.warn('Unknown sort type!', sortType, colors);
    }

    return colors;
}