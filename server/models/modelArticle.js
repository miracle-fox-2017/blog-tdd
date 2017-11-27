const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const Article = mongoose.model('articles', articleSchema)

module.exports = Article