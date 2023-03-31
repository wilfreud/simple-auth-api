const { Schema, model } = require('mongoose')

const Contact = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    group: { type: String }
})

module.exports = model('Contact', Contact)