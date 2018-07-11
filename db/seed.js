const mongoose = require('./connection.js')
const User = require('./User.js')
const Memory = require('./Memory.js')
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
          ImageURL: 'https://images.pexels.com/photos/373488/pexels-photo-373488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Stuck on Javascript',
          authorName: user._id,
          postString: 'I have no idea how Javascript works, I\'m so stuck!',
          ImageURL: 'https://images.pexels.com/photos/247791/pexels-photo-247791.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Group Project',
          authorName: user._id,
          postString: 'We just started our group project a few days ago! We\'re building a memory app and it\'s going to be a ton of fun',
          ImageURL: 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        })
      ]).then(() => {
        user.save(err => console.log(err))
      })
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
          title: 'WOOOOOOO!!',
          authorName: user._id,
          postString: 'I\'m so excited and I just can\'t hide it',
          ImageURL: 'https://images.pexels.com/photos/119972/pexels-photo-119972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'I love Javascript',
          authorName: user._id,
          postString: 'I love everything I can do with Javascript, I just wanted to share with you all the project I\'m working on!',
          ImageURL: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        })
      ]).then(() => {
        user.save(err => console.log(err))
      })
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
          title: 'Biking',
          authorName: user._id,
          postString: 'I biked my entire way accross North and South America, here\'s a picture from my trip',
          ImageURL: 'https://files.slack.com/files-pri/T2D6FU4JY-FBN67NBEV/image_from_ios.jpg'
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Express.js',
          authorName: user._id,
          postString: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          ImageURL: 'https://images.pexels.com/photos/265110/pexels-photo-265110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Anniversary',
          authorName: user._id,
          postString: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa',
          ImageURL: ''
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Group Project!',
          authorName: user._id,
          postString: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat',
          ImageURL: 'https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        }),
        Memory.create({
          title: 'Dinner with the boys',
          authorName: user._id,
          postString: 'Lorem ipsum dolor',
          ImageURL: 'https://images.pexels.com/photos/8313/food-eating-potatoes-beer-8313.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }).then(memory => {
          user.memories.push(memory)
        })
      ]).then(() => {
        user.save(err => console.log(err))
      })
    })
  })
})
