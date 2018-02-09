export class Errors {

    constructor() {
        this.errors = {};
    }

    record(errors) {
        this.errors = errors;
    }

    get(field) {
        if (this.errors[field])
            return this.errors[field][0];
    }

    clear(field) {
        delete this.errors[field];
    }

    has(field) {
        return this.errors[field];
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }
}