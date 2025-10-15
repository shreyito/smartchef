import { MongoClient, type Db, type Collection } from "mongodb"

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI

let clientPromise: Promise<MongoClient> | undefined

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    if (!uri) {
      console.warn("[v0] MONGODB_URI is not set. API may fallback to static data.")
      global._mongoClientPromise = Promise.reject(new Error("MONGODB_URI missing"))
    } else {
      const client = new MongoClient(uri)
      global._mongoClientPromise = client.connect()
    }
  }
  clientPromise = global._mongoClientPromise
} else {
  if (uri) {
    const client = new MongoClient(uri)
    clientPromise = client.connect()
  } else {
    clientPromise = Promise.reject(new Error("MONGODB_URI missing"))
  }
}

export async function getDb(): Promise<Db> {
  if (!clientPromise) throw new Error("Mongo client not initialized")
  const client = await clientPromise
  const dbName = process.env.MONGODB_DB_NAME || "smartchef"
  return client.db(dbName)
}

export async function getCollection<T = any>(name?: string): Promise<Collection<T>> {
  const db = await getDb()
  const collectionName = name || process.env.MONGODB_COLLECTION || "recipe"
  return db.collection<T>(collectionName)
}
