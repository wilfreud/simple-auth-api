const Contacts = require('../models/contactsModel')


const getAllContacts = (req, res) => {

    // Querying 
    Contacts.find({ owner: req.user.id }).populate({
        "path": "owner",
        "select": "username -_id"
    })
        .then((contact) => {
            // console.log(contact)
            res.status(200).json(contact)
        })
        .catch((err) => {
            res.status(500).json({ error: "Something went wrong during the query..." })
        })
}

const createContact = (req, res) => {

    const { name, phone, owner } = req.body

    // Basic check
    if (!name || !phone) {
        res.status(400)
        throw new Error('Fields [name, phone] are required !')
    }

    req.body.owner = req.user.id
    Contacts.create(req.body)
        .then((contact) => {
            res.status(201).json({ message: "Successfully added contact", data: contact })
        })
        .catch((err) => {
            // console.error(err)
            res.status(400)
            // Duplicate key error
            if (err.code == 11000) {
                res.json({ message: "Error: Phone number already exist.", error: err })
            }
            res.json({ error: err })
        })

}

const getOneContact = (req, res) => {

    const { id } = req.params

    // basic check
    if (!id) {
        res.status(400)
        throw new Error('id is required !')
    }

    Contacts.findById(id).populate({
        "path": "owner",
        "select": "username -_id"
    })
        .then(contact => {
            if (!id) {
                res.status(404).json({ error: "Contact not found!" })
            }
            res.status(200).json(contact)
        })
        .catch(err => {
            res.status(404).json({ message: "Error finding contact...", error: err })
        })
}

const updateContact = (req, res) => {

    const { id } = req.params
    // basic check
    if (!id) {
        res.status(400)
        throw new Error('id is required !')
    }
    // console.log(id, req.user.id)
    Contacts.findOneAndUpdate({
        $and: [
            { "_id": id },
            { "owner": req.user.id }
        ]
    },
        req.body,
        { new: true }
    )
        .then((newContact) => {
            newContact.populate({
                "path": "owner",
                "select": "username -_id"
            })

            res.status(200).json({ message: "Contact udpated!", data: newContact })
        })
        .catch(err => {
            // console.error(err)
            res.status(403).json({ message: "Unauthorized update!", error: err })
        })
}

const deleteContact = (req, res) => {

    const { id } = req.params

    // basic check
    if (!id) {
        res.status(400)
        throw new Error('id is required !')
    }

    Contacts.findOneAndDelete({
        $and: [
            { "_id": id },
            { "owner": req.user.id }
        ]
    })
        .then((obj) => {
            // Null check
            if (!obj) {
                throw new Error('Contact not found')
            }
            res.status(204).json({ message: "Contact successfully deleted", data: obj })
        })
        .catch((err) => {
            // console.error(err)
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