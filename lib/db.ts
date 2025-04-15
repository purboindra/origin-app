import { client, runMongoDB } from "./mongoose";

export async function getDb() {
  await runMongoDB();
  return client.db("originapp");
}
