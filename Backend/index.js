
const express = require('express')
const app = express()
const PORT = 80
const cors = require('cors')
const passport = require('passport')
const cookie = require('cookie')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')
const router = require('express').Router()

const db = require('./database.js')
let users = db.users
require('./passport.js')



    app.use('/api', router)
    router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
    
    router.use(express.json())
    router.use(express.urlencoded({ extended: false }))




    router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

    router.get('/alluser', (req, res) => res.json(db.users.users))

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('Login: ', req.body, user, err, info)
            if (err) return next(err)
            if (user) {
                const token = jwt.sign(user, db.SECRET, {
                    expiresIn: (req.body.ischeck === "on") ? '7d' : '1d'
                })
                // req.cookie.token = token
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60,
                        sameSite: "strict",
                        path: "/",
                    })
                );
                res.statusCode = 200
                return res.json({ user, token })
            } else
                return res.status(422).json(info)
        })(req, res, next)
    })

 // Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

 app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
 