import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Define MONGO_URI in .env');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI)
            .then((mongooseInstance) => {
                return mongooseInstance;
            })
            .catch((error) => {
                console.error("MongoDB connection error:", error);
                throw error;
            });
    }
    

    cached.conn = await cached.promise;
    return cached.conn;
};