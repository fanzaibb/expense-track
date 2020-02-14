const express = require('express')
const app = express()

//
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/exptracker', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
const Exp = require('./models/record')

//
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ dafaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//
const moment = require('moment')

const session = require('express-session')
app.use(session({
  secret: 'secret', //required
  resave: false, //if true, will update the session into session store automatically
  saveUninitialized: true // save uninitialized(new and unchanged) session into session store
}))


app.use('/', require('./routes/home'))
app.use('/record', require('./routes/record'))
app.use('/user', require('./routes/user'))


app.listen(3000, () => {
  console.log('App is running!')
})