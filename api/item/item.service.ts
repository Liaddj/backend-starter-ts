import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import { Item } from '../../types/item.js'

export const itemService = {
    query,
    getById,
    remove,
    add,
    update
}

const COLLECTION_NAME = 'item'

async function query(): Promise<Item[]> {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        const items = await collection.find({}).toArray() as unknown as Item[]
        return items
    } catch (err) {
        loggerService.error('cannot find items', err)
        throw err
    }
}

async function getById(itemId: string): Promise<Item> {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        const item = await collection.findOne({ _id: new ObjectId(itemId) }) as unknown as Item
        return item
    } catch (err) {
        loggerService.error(`while finding item ${itemId}`, err)
        throw err
    }
}

async function remove(itemId: string): Promise<void> {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        await collection.deleteOne({ _id: new ObjectId(itemId) })
    } catch (err) {
        loggerService.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}

async function add(item: Item): Promise<Item> {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        item.createdAt = Date.now()
        const result = await collection.insertOne(item as any)
        item._id = result.insertedId.toString()
        return item
    } catch (err) {
        loggerService.error('cannot insert item', err)
        throw err
    }
}

async function update(item: Item): Promise<Item> {
    try {
        const itemToSave = {
            name: item.name,
            price: item.price
        }
        const collection = await dbService.getCollection(COLLECTION_NAME)
        await collection.updateOne({ _id: new ObjectId(item._id) }, { $set: itemToSave })
        return item
    } catch (err) {
        loggerService.error(`cannot update item ${item._id}`, err)
        throw err
    }
}