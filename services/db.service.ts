import { MongoClient, Db, Collection } from 'mongodb'
import { config } from '../config/index.js'
import { loggerService } from './logger.service.js'

export const dbService = {
    getCollection
}

let dbConn: Db | null = null

async function getCollection(collectionName: string): Promise<Collection> {
    try {
        const db = await _connect()
        const collection = db.collection(collectionName)
        return collection
    } catch (err) {
        loggerService.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function _connect(): Promise<Db> {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL)
        const db = client.db(config.dbName)
        dbConn = db
        loggerService.info('Connected to DB successfully')
        return db
    } catch (err) {
        loggerService.error('Cannot Connect to DB', err)
        throw err
    }
}