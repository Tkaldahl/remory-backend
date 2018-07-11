const mongoose = require('./connection.js')
const User = require('./User.js')
const Memory = require('./Memory.js')
const Comment = require('./Comment.js')
const bcrypt = require('bcrypt-nodejs')
mongoose.Promise = Promise

User.find({}).remove(() => {
  Memory.find({}).remove(() => {
    let daniel = User.create({
      email: 'daniel@sample.com',
      password: '',
      firstName: 'Daniel',
      lastName: 'Lousa',
      profPicture: ''
    }).then((quote) => {
      quote.save(err => console.log(err))
    })

    let taylor = User.create({
      email: 'taylor@sample.com',
      password: '',
      firstName: 'Taylor',
      lastName: 'Kaldahl',
      profPicture: ''
    }).then((quote) => {
      quote.save(err => console.log(err))
    })

    let isaiah = User.create({
      email: 'isaiah@sample.com',
      password: '',
      firstName: 'Isaiah',
      lastName: 'Berg',
      profPicture: ''
    }).then((user) => {
      user.save(err => console.log(err))
    })
  })
})
