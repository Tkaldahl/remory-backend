const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const User = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  profPicture: String,
  memories: [{ type: Schema.Types.ObjectId, ref: 'Memory' }]

})

module.exports = mongoose.model('User', User)
