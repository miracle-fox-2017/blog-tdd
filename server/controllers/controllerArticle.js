const Article = require('../models/modelArticle')

const getDataArticle = (req, res) => {
    // console.log('yeay')
    Article.find()
        .then((dataArticle) => {
            // console.log('dapet data ', dataArticle)
            res.status(200).send(dataArticle)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const createArticle = (req, res) => {
    Article.create({
        title: req.body.title,
        description: req.body.description
    })
        .then((dataArticle) => {
            res.status(200).send(dataArticle)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const updateArticle = (req, res) => {
    // console.log(req.params.id)
    Article.findById(req.params.id)
        .then((dataArticle) => {
            dataArticle.title = req.body.title || dataArticle.title
            dataArticle.description = req.body.description || dataArticle.description

            dataArticle.save()
                .then((newData) => {
                    res.status(200).send(newData)
                })
                .catch((reason) => {
                    res.status(500).send(reason)
                })
        })
}

const deleteArticle = (req, res) => {
    Article.remove({
        _id: req.params.id
    })
        .then(() => {
            res.status(200).send({
                message: "Successfully deleted!"
            })
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })

}
module.exports = {
    getDataArticle,
    createArticle,
    updateArticle,
    deleteArticle
}