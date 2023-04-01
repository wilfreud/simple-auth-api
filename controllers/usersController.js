const User = require('../models/usersModel')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const getUser = (req, res) => {


    const { id } = req.params

    // Null check
    if (!id) {
        res.status(400)
        throw new Error('User id is requierd.')
    }

    User.findById(id)
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: "User not found" })
            }
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

const getAllUsers = (req, res) => {


    User.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}


const loginUser = (req, res) => {

}

const registerUser = (req, res) => {


    const { username, email, password } = req.body

    // // Null check
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are required !')
    }

    // Password length
    if (password.length < 8) {
        res.status(400)
        throw new Error('Password too short. Minimum length is 8 characters')
    }

    // Hashing password
    bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => {
            // Saving data in database
            User.create({ username: username, email: email, password: hash })
                .then((user) => {
                    res.status(201).json({ username: user.username, email: user.email })
                })
                // Catch User creation error
                .catch((err) => {
                    // Duplicate key error
                    if (err.code == 11000) {
                        res.status(400).json({ message: `Field already exists`, error: err.keyValue })
                        return
                    }
                    // else {

                    res.status(500).json({ error: err.errors })
                    // }
                })
        })
        // Catch hash error
        .catch((err) => {
            console.error(err)
            res.status(500).json({ error: "Internal server Error. If the problem persists please contact the administrator" })
        })

}

const deleteUser = (req, res) => {
    const { id } = req.params

    if (!id) {
        res.status(400)
        throw new Error('User id is required')
    }



    User.findByIdAndDelete(id)
        .then(obj => {
            if (!obj) {
                throw new Error('User not foud')
            }
            res.status(204).json({ message: 'User deleted' })
        })
        .catch(err => {
            res.status(404).json({ error: err.message || err })
        })

}

const updateUser = (req, res) => {
    const { id } = req.params
    // Null check
    if (!id) {
        res.status(400)
        throw new Error('User id is missing !')
    }

    // Check if password needs to be updated
    if (req.body.password) {
        try {
            const hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS)
            req.body.password = hash
        }
        catch (e) {
            // console.error(e)
            res.status(500)
            res.json({ error: 'Internal server error. Please contact your administrator' })
            return
        }
    }

    // Actually updating
    User.findByIdAndUpdate(id, req.body, { new: true })
        .then((newUser) => {
            // Null check
            if (!newUser) {
                res.status(404)
                throw new Error('User not found! ->')
            }
            res.status(200).json({ message: "User updated" })
        })
        .catch((err) => {
            res.status(404).json({ error: "User not found" })
        })

}


const currentUser = (req, res) => {



}

module.exports = { getAllUsers, getUser, loginUser, registerUser, currentUser, deleteUser, updateUser }