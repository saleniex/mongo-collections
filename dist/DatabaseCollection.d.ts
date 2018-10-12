import MongoDatabaseClient from './MongoDatabaseClient';
import { Collection } from 'mongodb';
export default class DatabaseCollection {
    private _client;
    readonly name: string;
    constructor(name: string, client: MongoDatabaseClient);
    get(): Promise<Collection>;
}
