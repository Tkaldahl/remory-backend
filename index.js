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
                  token: token,
                  user: user
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
              token: token,
              user: user
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

// POST request to user/search query from front end Axios, returns one {User}
app.post('/user/search', (req, res) => {
  console.log('HTTP POST req at /user/search')
  console.log(req.body.email)
  console.log('above is req.body.email')
  User.findOne({email: req.body.email}, function (err, result) {
    if (err) { console.log(err.response) }
    if (!result) { res.send('That user does not exist.') }
    if (result) { console.log(result) }
  })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})
// this response sends the entire User object after search query from Axios

// tested successfully with the id from this.state.displayedUser with the POST req.body
// this also means that +Memory should only be available to authenticated users
app.post('/memory', (req, res) => {
  console.log('HTTP POST @ /MEMORY')
  console.log(req.body)
  Memory.create({
    titleString: req.body.titleString,
    authorName: mongoose.Types.ObjectId(req.body.displayedUser),
    postString: req.body.postString,
    imageURL: req.body.imageURL
  })
    .then((memory) => {
      console.log(memory)
    }
    // User.findOneAndUpdate({id: req.body.displayedUser}, function (err, result) {
    //   // result.memories.push(req.body.id)
    //   console.log(result)
    // })
    )
})

// this creates +memory with associated user id (since POST request includes displayedUser state from auth)

// post request to memory/search with displayedUser id string to generate [memories]
app.post('/memory/search', (req, res) => {
  console.log('HTTP POST req at /user/search')
  Memory.find({authorName: req.body.id}, function (err, result) {
    if (err) { console.log(err.response) }
    if (!result) { res.send('That user does not have any memories to display.') }
    if (result) { console.log(result) }
  })
    .sort({createdAt: -1})
    .populate('authorName')
    .then((memoryArray) => {
      res.json(memoryArray)
    })
    .catch((err) => {
      console.log(err)
    })
})
// this request tested, on POST to /memory/search generates array in MemoryContainer

// GET request to /memory/:id for help in rendering MemoryDetail if necessary
app.get('/memory/:id', (req, res) => {
  Memory.findOne({ _id: req.params.id })
    .populate('authorName')
    .then((memory) => {
      res.json(memory)
    })
    .catch((err) => {
      console.log(err)
    })
})
// needs testing: GET using req.params to receive single JSON object of memory

// in progress: PUT @ /memory/:id to update given document
app.put('/memory/update', (req, res) => {
  console.log('HTTP PUT req at /memory/update')
  console.log('req.body is: ' + req.body)
  Memory.findOneAndUpdate({_id: req.body.id}, {$set: {postString: req.body.newContent}}, (err, memory) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    console.log(memory)
    return res.json(memory)
  })
})
// awaits testing: needs to receive PUT request with :id and all new form data from axios

// in progress: DELETE method at /memory/:id of API
app.delete('/memory/:id', (req, res) => {
  console.log('HTTP DELETE req at /memory/:id')
  console.log('This is the id of the memory we will delete: ' + req.body.id)
  Memory.deleteOne({_id: req.body.id}, function (err) {
    if (err) return (err)
  })
    .catch((err) => {
      console.log(err)
    })
})
// needs testing with MemoryDetail buttons on the front end

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`🌟🌟 Heroku PORT: ${app.get('port')} 🌟🌟`)
})

app.listen(4000, () => {
  console.log('✅: REMORY-backend test for +memory and detail')
})
// here we set the port for development / heroku back end at 3001
// we set the local "listening" port for localhost:4000
