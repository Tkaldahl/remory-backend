# remory-frontend

===BACK END: MODELS & PROPS===

User Model | Properties:
1. email
2. password
3. firstName
4. lastName
5. profPicture
6. [Memories] ref authored by this User

Memory Model | Properties:
1. title (limit character length to <50 for brevity / fit in preview boxes)
2. authorName
3. postString
4. imageURL
5. createdAt
6. [Comments] ref to this memory

Comment Model | Properties:
1. authorName
2. commentString
3. createdAt

===BACK END: FOLDER SCAFFOLDING [functionality required]===
1. remory-backend
    1. db
        1. connection.js [define/require mongoose, set up mongoose.connect conditional based on process.env.NODE_ENV, mongoose.Promise, module.exports = mongoose]
        2. User.js [user model defines mongoose, requires from connection.js, define Schema, const User = new Schema({ // propName: dataType, etc.}), module.exports = mongoose.model(’User’, User)
        3. Memory.js [memory model defines mongoose, requires from connection.js, define Schema, const Memory = new Schema({ // propName: dataType, etc.}), module.exports = mongoose.model(’Memory’, Memory)
        4. Comment.js [comment model defines mongoose, requires from connection.js, define Schema, const Comment = new Schema({ // propName: dataType, etc.}), module.exports = mongoose.model(’Comment’, Comment)
        5. seed.js  [define mongoose, require from connection.js, define and require all Models, define Mongoose.Promise = Promise…then code for each seed file for database  ModelName.find({}).remove( () => let example = modelName.create({propName: value, propName2: value, etc.}).then((example)=>{example.save(err=>console.log(err))})
    2. node_modules (default from npm install
    3. index.js define/require express define/require cors define/require all models from ./db/connection.js define const app = express()  —CRUD functionality for all necessary models— ———receive axios calls from front end—— app.get app.post app.put app.delete  example: app.post('/', (req, res) => {Model.create( {propName: req.body.valueName, etc.}).then((item) => {res.json(quote)}….etc. res.redirect and .catch   app.set('port', process.env.PORT || 3001)  app.listen(app.get('port'), () => { console.log(`✅ Heroku PORT: ${app.get('port')} 🌟`) })  app.listen(4000, () => { console.log('success: REMORY troubleshooting port 4000') })
    4. package.json
    5. package-lock.json
    6. readme.md   
