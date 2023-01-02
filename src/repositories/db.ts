import {MongoClient} from "mongodb";

export type ProductType = {
    id: number;
    title: string;
}

const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017'

const client = new MongoClient(mongoUri)
const db = client.db('shop');
export const productsCollection = db.collection<ProductType>('products')

export const runDb = async () => {
    try {
        await client.connect()
        await client.db('products')
        console.log('\x1b[1;32m', 'Successfully connected to MongoDB.', '\x1b[0m')
    } catch (error) {
        console.error('\x1b[1;31m', `!!! Failed connected to MongoDB. Error: ${error} !!!`, '\x1b[0m')

        await client.close()
    }
}
