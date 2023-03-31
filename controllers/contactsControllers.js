const getAllContacts = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)


    res.status(200).json({ message: "Contacts..." })
}

const createContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    const { name, phone, group, email } = req.body

    if (!name || !phone) {
        res.status(400).json({ error: 'All fields name and phone required !' })
        return
    }


    res.status(201).json({ message: "Contact created!" })
}

const getOneContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    res.status(200).json({ message: "Getting contact!" })
}

const updateContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    res.status(200).send({ message: "Contact udpated" })
}

const deleteContact = (req, res) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    res.status(204).send({ message: "Contact deleted" })
}

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getOneContact
}