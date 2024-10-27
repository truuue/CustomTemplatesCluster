import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI || "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  minPoolSize: 5,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connecté avec succès à MongoDB");
    return client.db();
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
}

export { connectToDatabase };
