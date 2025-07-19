import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
const options = {};

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}

const clientPromise = global._mongoClientPromise;
export default clientPromise;