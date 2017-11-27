const User = require('../models/modelUser')
const Encrypt = require('../helpers/encrypt')
const Decrypt = require('../helpers/decrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = (req, res) => {
    Encrypt(req.body.password).then((newPassword) => {
        User.create({
            name: req.body.name,
            username: req.body.username,
            password: newPassword,
            email: req.body.email
        })
            .then((dataUser) => {
                res.status(200).send({
                    message: "Successfully inserted!"
                })
            })
            .catch((reason) => {
                res.status(500).send(reason)
            })
    })
}

const getDataUser = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .then((dataUser) => {
            if (!dataUser) {
                res.status(401).json({
                    message: "Authentication failed. User not found"
                })
            } else {
                Decrypt(req.body.password, dataUser.password)
                    .then((hasil) => {
                        if (!hasil) {
                            res.status(401).json({
                                message: "Authentication failed. Password is incorrect"
                            })
                        } else {
                            const payload = {
                                username: dataUser.username,
                                isLogin: true
                            }

                            jwt.sign(payload, process.env.secret, function (err, token) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.status(200).send({
                                        message: "Login berhasil",
                                        token: token
                                    })
                                }
                            })
                        }
                    })
                    .catch((reason) => {
                        res.status(500).send(reason)
                    })
            }
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

module.exports = {
    createUser,
    getDataUser
}