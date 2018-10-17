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



    public async findIntoArray(query: object): Promise<any[]> {
        return new Promise<any[]>((resolve: any, reject: any) => {
            this.get()
                .then((dbCollection: any) => {
                    dbCollection.find(query).toArray((_: any, result: any) => {
                        resolve(result);
                    });
                })
                .catch((reason: any) => {
                    reject(reason);
                });
        });
    }


    public async findOne(query: object): Promise<any> {
        const items = await this.findIntoArray(query);
        if (items.length === 0) {
            return null;
        }
        if (items.length > 1) {
            throw new Error(`More than one (${items.length}) item found while querying for ${JSON.stringify(query)}`);
        }

        return items[0];
    }


    public async insertOne(docs: object): Promise<void> {
        return new Promise<void>((resolve: any) => {
            this.get().then((dbCollection: Collection) => {
                dbCollection
                    .insertOne(docs)
                    .then(() => {
                        resolve();
                    });
            });
        });
    }


    public async updateOne(query: object, doc: object): Promise<void> {
        return new Promise<void>((resolve: any) => {
            this.get().then((dbCollection: Collection) => {
                dbCollection
                    .updateOne(query, {$set: doc})
                    .then(() => {
                        resolve();
                    });
            });
        });
    }
}