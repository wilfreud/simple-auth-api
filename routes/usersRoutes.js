const express = require('express')
const router = express.Router()
const {
    loginUser,
    registerUser,
    currentUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/usersController')

router.get('/', getAllUsers)
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/current', currentUser)

module.exports = router  