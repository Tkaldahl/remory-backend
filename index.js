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

// building route for creating AUTHENTICATED +user (POST) at /user
app.post('/user/signup', (req, res) => {
  const signup = passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/user/signup',
    failureFlash: true
  })
  console.log('POST to /user/signup handled on backend')
  return signup(req, res)
})
// upon POST of authenticated form data at remory-api.herokuapp.com/user

// building route for login AUTHENTICATED user (POST) at /user/login
app.post('/user/login', (req, res) => {
  const login = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
  })
  console.log('POST to /user/login handled on backend')
  return login(req, res)
})
// upon POST of authenticated login form data at remory-api.herokuapp.com/user/login

// TO do:
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
  console.log('✅: REMORY-backend test POST /user/signup and /user/login')
})
// here we set the port for development / heroku back end at 3001
// we set the local "listening" port for localhost:4000
