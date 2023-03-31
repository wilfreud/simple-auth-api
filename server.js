const express = require('express')
require('dotenv').config()
const errorsHandler = require('./middlewares/errorHandler')
const contactsRoutes = require('./routes/contactsRoutes')
// Constants
const PORT = process.env.PORT || 8877

// Init app
const app = express()
// Json parser
app.use(express.json())
// Routing
app.use('/api/contacts', contactsRoutes)
// Adding errors handler
app.use(errorsHandler)

// Listening
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
})