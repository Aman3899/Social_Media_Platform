import { MongoClient } from "mongodb";
import config from "config";

const dbURL = config.get("DB_URI");

const client = new MongoClient(dbURL);
let connection;
try {
    connection = await client.connect();
    console.log("Success! Database is Connected Successfully");
} catch (error) {
    console.log("Error! Database is not Connected")
}
let db = connection.db("SocialMediaPlatform");
export default db;