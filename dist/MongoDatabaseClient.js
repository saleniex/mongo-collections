"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
class MongoDatabaseClient {
    static createInstance(endpoint) {
        this._instance = new MongoDatabaseClient(endpoint);
    }
    static instance() {
        if (!this._instance) {
            throw new Error('Cannot get mongo database client. Create instance first.');
        }
        return this._instance;
    }
    constructor(endpoint) {
        this._endpoint = endpoint;
    }
    connect() {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(this._endpoint, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    return reject(err.message);
                }
                this._client = client;
                resolve();
            });
        });
    }
    // @ts-ignore
    connectIfNotConnected() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._client) {
                yield this.connect();
            }
        });
    }
    get client() {
        if (!this._client) {
            throw new Error('Cannot get Mongo client. Connect first.');
        }
        return this._client;
    }
    get database() {
        if (!this._client) {
            throw new Error('Cannot get Mongo database. Connect first.');
        }
        return this._client.db();
    }
}
exports.MongoDatabaseClient = MongoDatabaseClient;
//# sourceMappingURL=MongoDatabaseClient.js.map