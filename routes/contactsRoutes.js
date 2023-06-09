const express = require('express')
const router = express.Router()
const {
    getAllContacts,
    createContact,
    getOneContact,
    deleteContact,
    updateContact
} = require('../controllers/contactsControllers')
const validateToken = require('../middlewares/tokenValidation')

// Use token validator for all routes
router.use(validateToken)

// Creating new route for contacts (global)
router.route('/')
    .get(getAllContacts)
    .post(createContact)


// Creating new route for contact (specific)
router.route('/:id')
    .get(getOneContact)
    .put(updateContact)
    .delete(deleteContact)


// Export the router thus making it available
module.exports = router