const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const Comment = new Schema({
  _id: Schema.Types.ObjectId,
  authorName: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  commentString: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', Comment)
