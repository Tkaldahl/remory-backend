const LocalStrategy = require('passport-local').Strategy
const User = require('./User.js')
// reference Passport authentication docs http://www.passportjs.org/docs/username-password/
// reference passport-local documentation https://github.com/jaredhanson/passport-local

module.exports = function (passport) {
  passport.serializeUser(function (user, callback) {
    callback(null, user.id)
  })

  passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
      callback(err, user)
    })
  })

  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function (req, email, password, callback) {
        console.log('starting signup process')
        console.log(req.body)
        User.findOne({ 'email': email })
          .then(user => {
            if (user) {
              console.log('duplicate email found!')
              return callback(
                null,
                false,
                req.flash('signupMessage', 'this Remory email is already taken!')
              )
            } else {
              console.log('user is unique, new user in progress')
              let newUser = new User()
              newUser.email = email
              newUser.password = newUser.encrypt(password)
              newUser.firstName = req.body.firstName
              newUser.lastName = req.body.lastName
              newUser.profPicture = req.body.profPicture
              newUser.save(err => {
                if (err) throw err
                return callback(null, newUser)
              })
            }
          })
          .catch(err => console.log(err))
      }
    )
  )

  // If the credentials are valid, the verify callback invokes done to supply
  // Passport with the user that authenticated. If the credentials are not valid
  // (for example, if the password is incorrect), done should be invoked with false
  // instead of a user to indicate an authentication failure.

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function (req, email, password, callback) {
        User.findOne({ 'email': email }, function (err, user) {
          if (err) return callback(err)

          if (!user) {
            return callback(
              null,
              false,
              req.flash('loginMessage', 'No user found')
            )
          }
          if (!user.validPassword(password)) {
            return callback(
              null,
              false,
              req.flash('loginMessage', 'Ooops, wrong password')
            )
          }
          return callback(null, user)
        })
      }
    )
  )
}
