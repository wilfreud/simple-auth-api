const express = require('express')
const errorsHandler = require('./middlewares/errorHandler')
const consoleLogger = require('./middlewares/logger')
const contactsRoutes = require('./routes/contactsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const mongoose = require('mongoose')
require('dotenv').config()

// Constants
const PORT = process.env.PORT || 8877

// Init app
const app = express()

// using json parser
app.use(express.json())

// Using middlewarerss
app.use(consoleLogger)
app.use(errorsHandler)

// Using routes
app.use('/api/contacts', contactsRoutes)
app.use('/api/users', usersRoutes)
// Listening
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
})

// Connect to Database
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@${process.env.MONGO_CLUSTER}.l0wfd7x.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to database."))
    .catch((err) => console.error("Error connecting to database...\n", err.message))
