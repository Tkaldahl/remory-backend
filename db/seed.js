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
      profPicture: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/34814392_446060815806750_6293684533975842816_o.jpg?_nc_cat=0&oh=d554eae8f49ba4b81977bd797494a392&oe=5BE4ADF0'
    }).then((user) => {
      Promise.all([
        Memory.create({
          title: 'First Day of Class',
          authorName: user._id,
          postString: 'Today was my first day at GA, I met my instructors and a lot of nice classmates I\'m really excited to start working on my projects!',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Stuck on Javascript',
          authorName: user._id,
          postString: 'I have no idea how Javascript works, I\'m so stuck!',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Group Project',
          authorName: user._id,
          postString: 'We just started our group project a few days ago! We\'re building a memory app and it\'s going to be a ton of fun',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        })
      ])
    })

    let taylor = User.create({
      email: 'taylor@sample.com',
      password: encryptPass('taylor'),
      firstName: 'Taylor',
      lastName: 'Kaldahl',
      profPicture: 'https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-1/14305452_10154514938472520_1717618365352755594_o.jpg?_nc_cat=0&oh=0a83a92517c2e524926ab5d13595cc35&oe=5B9F7E72'
    }).then((user) => {
      Promise.all([
        Memory.create({
          title: '',
          authorName: user._id,
          postString: '',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: '',
          authorName: user._id,
          postString: '',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        })
      ])
    })

    let isaiah = User.create({
      email: 'isaiah@sample.com',
      password: encryptPass('isaiah'),
      firstName: 'Isaiah',
      lastName: 'Berg',
      profPicture: 'nopicture'
    }).then((user) => {
      Promise.all([
        Memory.create({
          title: '',
          authorName: user._id,
          postString: '',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: '',
          authorName: user._id,
          postString: '',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: '',
          authorName: user._id,
          postString: '',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: '',
          authorName: user._id,
          postString: '',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: '',
          authorName: user._id,
          postString: '',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        })
      ])
    })
  })
})
