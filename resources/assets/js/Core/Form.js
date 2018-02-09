import {Errors} from "./Error";

export class Form {
    constructor(data) {
        this.data = data;

        for (let field in data) {
            this[field] = this.data[field];
        }

        this.errors = new Errors();
    }

    getFields() {
        let res = new FormData();

        for (let field in this.data) {
            res.append(field, this[field]);
        }

        return res;
    }

    reset() {
        for (let field in this.data) {
            this[field] = '';
        }
    }
}