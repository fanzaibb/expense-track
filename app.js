const express = require('express')
const app = express()

//
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo', {
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

//
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ dafaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))



app.listen(3000, () => {
  console.log('App is running!')
})