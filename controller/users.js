const Users = require('../model/user')

const login = (req, res) => {
    Users.find(req.body.username)
    .then(response => {
        if(req.body.password == response.password){
            res.status(200).send(response)
        }
        else{
            res.status(404).send(response)
        }
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

const register = (req, res) => {
    Users.create(req.body)
    .then(response => {
        res.status(201).send(response)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}


module.exports = {
    login,
    register
}