const mongoose = require('./connection.js')
const User = require('./User.js')
const Memory = require('./Memory.js')
const Comment = require('./Comment.js')
const bcrypt = require('bcrypt-nodejs')
mongoose.Promise = Promise

const encryptPass = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

User.find({}).remove(() => {
  Memory.find({}).remove(() => {
    let daniel = User.create({
      email: 'daniel@sample.com',
      password: encryptPass('daniel'),
      firstName: 'Daniel',
      lastName: 'Lousa',
      profPicture: ''
    }).then((quote) => {
      quote.save(err => console.log(err))
    })

    let taylor = User.create({
      email: 'taylor@sample.com',
      password: encryptPass('taylor'),
      firstName: 'Taylor',
      lastName: 'Kaldahl',
      profPicture: ''
    }).then((quote) => {
      quote.save(err => console.log(err))
    })

    let isaiah = User.create({
      email: 'isaiah@sample.com',
      password: encryptPass('isaiah'),
      firstName: 'Isaiah',
      lastName: 'Berg',
      profPicture: ''
    }).then((user) => {
      user.save(err => console.log(err))
    })
  })
})
