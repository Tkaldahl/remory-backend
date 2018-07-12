const express = require('express')
// express enables our back end / server functionality
const cors = require('cors')
// cors overrides safety measures preventing external reqs to deployed apps
const flash = require('connect-flash')
// flash message functionality possible in React?
var cookieParser = require('cookie-parser')
// cookieParser is needed to deal with session cookies for authentication
const bodyParser = require('body-parser')
// bodyParser takes care of JSON / HTTP request text transformations
const session = require('express-session')
// sessions required to have persistent user login experience with cookies
const passport = require('passport')
// passport enables authentication, functions in db/passport.js
const bcrypt = require('bcrypt-nodejs')
// bcrypt required to encrypt passwords upon POST / create requests

const encryptPass = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// encryptPass(password) invoked on passwords passed via HTTP POST requests

// Authentication dependencies start
const jwt = require('jwt-simple')
const config = require('./config/config')
const mongoose = require('./db/connection.js')
// Authentication dependencies end

const User = require('./db/User.js')
const Memory = require('./db/Memory.js')
const Comment = require('./db/Comment.js')
// all model schema

const app = express()
// shortcut app phrase to invoke Express methods

require('./db/passport.js')(passport)
// connects to Passport local strategy

// requires our models from db - required for RESTful routing of CRUD
var sessionOptions = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  secret: 'REMORY-IS-AWESOME',
  cookie: { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

app.use(cookieParser())

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// directs Express to utilize appropriate node modules
// note: created public directory for any desired static back end assets
// example path: http://localhost:4000/style.class
app.use(cookieParser())
app.use(session(sessionOptions))
// uses an Express Session with sessionOptions props
app.use(flash())
// enables flash messages (unknown React functionality)
app.use(passport.initialize())
app.use(passport.session())
// enables passport functionality
app.use(express.static('public'))
// allows static file hosting

// creating default path for root of API
app.get('/', (req, res) => {
  res.send('Welcome to the Remory API!')
})
// responds with welcome message

// creating route for GET all memories in database
app.get('/memory', (req, res) => {
  Memory.find({})
    .then((memories) => {
      res.json(memories)
    })
    .catch((err) => {
      console.log(err)
    })
})
// upon GET request at remory-api.herokuapp.com/memory returns: all memories

// building route to see all users in db (useful for future search)
app.get('/user', (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      console.log(err)
    })
})
// upon GET request to remory-api.herokuapp.com/user, JSON response with all users

// building route for creating user (POST) at /user
app.post('/user/signup', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          User.create({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profPicture: req.body.profPicture
          })
            .then(user => {
              if (user) {
                var payload = {
                  id: this.id
                }
                var token = jwt.encode(payload, config.jwtSecret)
                res.json({
                  token: token
                })
              } else {
                res.sendStatus(401)
              }
            })
        } else {
          res.sendStatus(401)
        }
      })
  } else {
    res.sendStatus(401)
  }
})

// building route for creating user (POST) at /user/login
app.post('/user/login', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          if (user.password === req.body.password) {
            var payload = {
              id: user.id
            }
            var token = jwt.encode(payload, config.jwtSecret)
            res.json({
              token: token
            })
          } else {
            res.sendStatus(401)
          }
        } else {
          res.sendStatus(401)
        }
      })
  } else {
    res.sendStatus(401)
  }
})

// upon POST of form data at remory-api.herokuapp.com/user, new user in db


// // building route for creating user (POST) at /user without authentication
// app.post('/user', (req, res) => {
//   console.log('HTTP POST @ /USER')
//   console.log(req.body.newUser)
//   User.create(req.body.newUser)
//     .then((user) => {
//       res.json(user)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
// // upon POST of  data at ROOT/user, adds user in db

// // building route for creating memory (POST) at /memory without authentication
// app.post('/memory', (req, res) => {
//   console.log('HTTP POST @ /MEMORY')
//   console.log(req.body)
//   User.findOne({email: req.body.authorEmail}, function (err, result) {
//     if (err) { console.log(err) }
//     if (!result) {
//       console.log('no user email matching memory post, sent to default')
//       User.findOne({ email: 'default' })
//         .then(user => {
//           Memory.create(req.body)
//             .then(memory => {
//               user.memories.push(memory)
//             }).then(() => {
//               user.save(err => console.log(err))
//             })
//         }
//         )
//     }
//   })
//     .then(user => {
//       Memory.create(req.body)
//         .then((memory) => {
//           user.memories.push(memory)
//         })
//         .then(() => {
//           user.save(err => console.log(err))
//           console.log('SUCCESS! POST @ /MEMORY')
//         })
//     })
// })

// // upon POST of  data at ROOT/user, adds user in db


// TO do:
// VALIDATE NEW CHANGES FROM TAYLOR AND TEST ALL ROUTES 
// GET at user/:id for user specific memories
// POST at /comment for new comment
// DELETE at /memory/:id for deleting memory document
// PUT at /memory/:id for editing memory

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`🌟🌟 Heroku PORT: ${app.get('port')} 🌟🌟`)
})

app.listen(4000, () => {
  console.log('✅: REMORY-backend test2 POST /memory, default created, +Memory ')
})
// here we set the port for development / heroku back end at 3001
// we set the local "listening" port for localhost:4000
