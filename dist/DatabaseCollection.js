"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class DatabaseCollection {
    constructor(name, client) {
        this.name = name;
        this._client = client;
    }
    // @ts-ignore
    get() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._client.connectIfNotConnected();
            return this._client.database.collection(this.name);
        });
    }
}
exports.default = DatabaseCollection;
//# sourceMappingURL=DatabaseCollection.js.map