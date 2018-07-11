const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MLAB_URL, { useNewUrlParser: true })
    .then(
      () => { console.log('✅ mongoDB connected to: MLAB_URL on heroku') },
      err => { console.log(err) }
    )
} else {
  mongoose.connect('mongodb://localhost:27017/remory', {useMongoClient: true, useNewUrlParser: true})
    .then(
      () => { console.log('✅ mongoDB connected to: localhost/remory') },
      err => { console.log(err) }
    )
}
// if running locally on your machine, ensure mongod and mongo running locally
// index.js runs locally on localhost:4000 if you want to view JSON after seeding

mongoose.Promise = Promise

module.exports = mongoose
