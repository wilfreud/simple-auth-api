const Contacts = require('../models/contactsModel')


const getAllContacts = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)

    // Querying 
    Contacts.find()
        .then((contact) => {
            // console.log(contact)
            res.status(200).json(contact)
        })
        .catch((err) => {
            res.status(500).json({ error: "Something went wrong during the query..." })
        })
}

const createContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    const { name, phone, group, email } = req.body

    // Basic check
    if (!name || !phone) {
        res.status(400)
        throw new Error('Both fields name and phone required !')
    }

    Contacts.create(req.body)
        .then((contact) => {
            res.status(201).json({ message: "Successfully added contact", data: contact })
        })
        .catch((err) => {
            // console.error(err)
            res.status(400)
            if (err.code == 11000) {
                res.json({ message: "Error: Phone number already exist.", error: err })
            }
            res.json({ error: err })
        })

}

const getOneContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    const { id } = req.params

    // basic check
    if (!id) {
        res.status(400)
        throw new Error('id is required !')
    }

    Contacts.findById(id)
        .then(contact => {
            res.status(200).json(contact)
        })
        .catch(err => {
            res.status(404).json({ message: "Error finding contact...", error: err })
        })
}

const updateContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    const { id } = req.params
    // basic check
    if (!id) {
        res.status(400)
        throw new Error('id is required !')
    }

    Contacts.findOneAndUpdate(id, req.body, { new: true })
        .then((newContact) => {
            // console.log(newContact)
            res.status(200).json({ message: "Contact udpated!", data: newContact })
        })
        .catch(err => {
            res.status(404).json({ message: "Error updating contact", error: err })
        })
}

const deleteContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    const { id } = req.params

    // basic check
    if (!id) {
        res.status(400)
        throw new Error('id is required !')
    }

    Contacts.findByIdAndDelete(id)
        .then((obj) => {
            // Null check
            if (!obj) {
                throw new Error('Contact not found')
            }
            res.status(204)//.json({ message: "Contact successfully deleted", data: obj })
        })
        .catch((err) => {
            console.error(err)
            res.status(404).json({ message: "Error deleting contact.", error: err })
        })
}

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getOneContact
}