import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

let isConnected = false;

export async function runMongoDB() {
  if (isConnected === false) {
    try {
      await client.connect();
      client.db("originapp");

      isConnected = true;
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    }
  }
}
