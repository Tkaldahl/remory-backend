const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect('mongodb://localhost/remory', {useMongoClient: true})
}
// if running locally on your machine, ensure mongod and mongo running locally
// app runs locally on localhost:4000

mongoose.Promise = Promise

module.exports = mongoose
