const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const Memory = new Schema({
  titleString: String,
  authorName: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  postString: String,
  imageURL: { type: String, default: 'https://i.imgur.com/2e2yaYZ.jpg' },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = mongoose.model('Memory', Memory)
