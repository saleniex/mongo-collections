import {MongoDatabaseClient} from './MongoDatabaseClient';
import {Collection} from 'mongodb';


export class DatabaseCollection {
    private _client: MongoDatabaseClient;
    public readonly name: string;


    constructor(name: string, client: MongoDatabaseClient) {
        this.name = name;
        this._client = client;
    }


    // @ts-ignore
    public async get(): Promise<Collection> {
        await this._client.connectIfNotConnected();
        return this._client.database.collection(this.name);
    }
}