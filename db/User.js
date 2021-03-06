const mongoose = require('./connection.js')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
// bcrypt is required to utilize the schema methods of .encrypt and .validPassword

const User = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  profPicture: { type: String, default: 'https://i.imgur.com/2e2yaYZ.jpg' },
  memories: [{ type: Schema.Types.ObjectId, ref: 'Memory' }]
})

User.methods.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}
module.exports = mongoose.model('User', User)
