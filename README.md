MongoDB collections
=====================================

Harmonizes MongoDB usage in application.

### Create own collection
```
import {DatabaseCollection, MongoDatabaseClient} from 'mongo-collections';

export default class ImageCollection extends DatabaseCollection {
    constructor(client: MongoDatabaseClient) {
        super('images', client);
    }
}
```

### Insert into collection
```
const dbCollection = await collection.get()
    .then((dbCollection) => {
        const object = {
            src: "/img/foo.png",
            alt: "Foo image"
        };
        return dbCollection.insertOne(object);
    });

```

