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
  res.render('Welcome to the Remory API!')
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
// axios GET request at remory-api.herokuapp.com/memory returns: all memories

// building route for creating user (POST) at /user
app.post('/user', (req, res) => {
  console.log(req.body)
  User.create({
    email: req.body.email,
    password: encryptPass(req.body.password),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profPicture: req.body.profPicture
  })
    .then((user) => {
      res.json(user)
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
})
// upon POST of form data at remory-api.herokuapp.com/user, new user in db

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


// this is an example of the routing for a get request, at root, for Memory model
// DATABASE does have other files besides Memory displayed in JSON response...

// app.post('/', (req, res) => {
//   console.log(req.body)
//   Model.create({
//     prop: req.body.propName,
//     prop: req.body.propName2
//   })
//     .then((model) => {
//       res.json(model)
//     })
//     .then(() => {
//       res.redirect('/')
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
// here we are saving for future use a POST request

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`🌟🌟 Heroku PORT: ${app.get('port')} 🌟🌟`)
})

app.listen(4000, () => {
  console.log('✅: REMORY-backend test localhost:4000/users')
})
// here we set the port for development / heroku back end at 3001
// we set the local "listening" port for localhost:4000
