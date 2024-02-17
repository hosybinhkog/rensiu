import mongoose, { Mongoose } from "mongoose";

const mongo_url = process.env.MONGO_DB;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!mongo_url) throw new Error("Missing MONGO_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(mongo_url, {
      dbName: "rensiu",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
