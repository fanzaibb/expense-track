const mongoose = require('mongoose')
const Exp = require('../record')
mongoose.connect('mongodb://localhost/exptracker', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', ()=>{
  console.log('db error')
})

db.once('open', ()=>{
  console.log('db connected!')
  for (let i = 0; i < 3; i++){
    Exp.create({
      name: 'sample-'+ i
    })
  }
  console.log('done')
})

