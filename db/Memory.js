const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const Memory = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  authorName: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  postString: String,
  imageURL: String,
  createdAt: { type: Date, default: Date.now }
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = mongoose.model('Memory', Memory)
