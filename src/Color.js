export default class Color {
    constructor(value) {
        this.value = this.parseColor(value);
    }

    static parseColor(c) {
        return c;
    }
};