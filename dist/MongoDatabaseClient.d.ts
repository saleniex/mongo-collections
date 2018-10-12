import { Db, MongoClient } from 'mongodb';
export declare class MongoDatabaseClient {
    private static _instance;
    private readonly _endpoint;
    private _client;
    static createInstance(endpoint: string): void;
    static instance(): MongoDatabaseClient;
    private constructor();
    connect(): Promise<void>;
    connectIfNotConnected(): Promise<void>;
    readonly client: MongoClient;
    readonly database: Db;
}
