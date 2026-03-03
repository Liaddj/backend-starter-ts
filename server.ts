import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

import { loggerService } from './services/logger.service.js'
import { itemRoutes } from './api/item/item.routes.js'

const app = express()

// הגדרות בסיסיות
app.use(cookieParser())
app.use(express.json())

// הגדרות CORS לפיתוח מקומי מול Vite
const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://localhost:3000'
    ],
    credentials: true
}
app.use(cors(corsOptions))

// ניתוב הבקשות (Routes)
app.use('/api/item', itemRoutes)

// הגדרת Port והרצה
const port = process.env.PORT || 3030

app.listen(port, () => {
    loggerService.info(`Server is running on port: ${port}`)
    loggerService.info(`Test API at: http://localhost:${port}/api/item`)
})