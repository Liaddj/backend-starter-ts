import { Request, Response } from 'express'
import { itemService } from './item.service.js'
import { loggerService } from '../../services/logger.service.js'

export async function getItems(req: Request, res: Response) {
    try {
        loggerService.debug('Getting Items')
        const items = await itemService.query()
        res.json(items)
    } catch (err) {
        loggerService.error('Failed to get items', err)
        res.status(500).send({ err: 'Failed to get items' })
    }
}

export async function getItemById(req: Request, res: Response) {
    try {
        const itemId = req.params.id
        const item = await itemService.getById(itemId)
        res.json(item)
    } catch (err) {
        loggerService.error('Failed to get item', err)
        res.status(500).send({ err: 'Failed to get item' })
    }
}

export async function addItem(req: Request, res: Response) {
    try {
        const item = req.body
        const addedItem = await itemService.add(item)
        res.json(addedItem)
    } catch (err) {
        loggerService.error('Failed to add item', err)
        res.status(500).send({ err: 'Failed to add item' })
    }
}

export async function updateItem(req: Request, res: Response) {
    try {
        const item = req.body
        const updatedItem = await itemService.update(item)
        res.json(updatedItem)
    } catch (err) {
        loggerService.error('Failed to update item', err)
        res.status(500).send({ err: 'Failed to update item' })
    }
}

export async function removeItem(req: Request, res: Response) {
    try {
        const itemId = req.params.id
        await itemService.remove(itemId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        loggerService.error('Failed to remove item', err)
        res.status(500).send({ err: 'Failed to remove item' })
    }
}