export default {
    dbURL: process.env.MONGO_URL || 'mongodb+srv://YOUR_MONGO_URI_HERE',
    dbName: process.env.DB_NAME || 'starter_db'
}