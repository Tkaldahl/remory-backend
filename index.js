const express = require('express')
// express enables our back end / server functionality
const cors = require('cors')
// cors overrides safety measures preventing external reqs to deployed apps
const bodyParser = require('body-parser')
// bodyParser takes care of JSON / HTTP request text transformations
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
// requires our models from db - required for RESTful routing of CRUD

const app = express()
// shortcut app phrase to invoke Express methods
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// directs Express to utilize appropriate node modules
// note: created public directory for any desired static back end assets
// example path: http://localhost:4000/style.css

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

// TO do:
// POST at user login with authentication
// POST at /memory for new memory
// GET at user/:id for user specific memories
// POST at /comment for new comment
// DELETE at /memory/:id for deleting memory document
// PUT at /memory/:id for editing memory

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`🌟🌟 Heroku PORT: ${app.get('port')} 🌟🌟`)
})

app.listen(4000, () => {
  console.log('✅: REMORY-backend test localhost:4000/user and localhost:4000')
})
// here we set the port for development / heroku back end at 3001
// we set the local "listening" port for localhost:4000
