import {Db, MongoClient, MongoError} from 'mongodb';

export class MongoDatabaseClient {
    private static _instance: MongoDatabaseClient;

    private readonly _endpoint: string;
    private _client: MongoClient;


    public static createInstance(endpoint: string): void {
        this._instance = new MongoDatabaseClient(endpoint);
    }


    public static instance(): MongoDatabaseClient {
        if ( ! this._instance) {
            throw new Error('Cannot get mongo database client. Create instance first.');
        }

        return this._instance;
    }

    private constructor(endpoint: string) {
        this._endpoint = endpoint;
    }


    public connect(): Promise<void> {
        return new Promise<void>((resolve: any, reject: any) => {
            MongoClient.connect(this._endpoint, { useNewUrlParser: true }, (err: MongoError, client: MongoClient) => {
                if (err) {
                    return reject(err.message);
                }
                this._client = client;
                resolve();
            });
        });
    }


    // @ts-ignore
    public async connectIfNotConnected(): Promise<void> {
        if ( ! this._client) {
            await this.connect();
        }
    }


    get client(): MongoClient {
        if ( ! this._client) {
            throw new Error('Cannot get Mongo client. Connect first.');
        }

        return this._client;
    }


    get database(): Db {
        if ( ! this._client) {
            throw new Error('Cannot get Mongo database. Connect first.');
        }
        return this._client.db();
    }
}