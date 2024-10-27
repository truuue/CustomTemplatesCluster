import dotenv from "dotenv";
import { MongoClient, MongoClientOptions } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI;
const options = {
  ssl: true,
  tls: true,
  minPoolSize: 1,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: "majority",
  directConnection: false,
};

let client: MongoClient | null = null;

export async function connectToDatabase() {
  try {
    if (!client) {
      if (!uri) {
        throw new Error(
          "MONGODB_URI manquant dans les variables d'environnement"
        );
      }
      client = new MongoClient(uri, options as MongoClientOptions);
      await client.connect();
    }
    return client.db();
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
}
