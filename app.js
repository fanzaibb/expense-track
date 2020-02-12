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

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/', require('./routes/home'))
app.use('/record', require('./routes/record'))


app.listen(3000, () => {
  console.log('App is running!')
})