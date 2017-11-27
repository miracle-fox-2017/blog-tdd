const Articles = require('../model/article')

const save = (req, res) =>{
    console.log(req.body)
    Articles.create(req.body)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(err => {
        res.status(500).send(err)
    })
} 

const list = (req, res) => {
    Articles.find()
    .then(response => {
        res.status(200).send(response)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

const remove = (req, res) =>{
    Articles.findOneAndRemove(req.params.id)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

module.exports = {
    save,
    list,
    remove
}