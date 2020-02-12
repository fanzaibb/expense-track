const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expSchema = new Schema({
  name:{
    type: String,
    require: true
  },
  category:{
    type: String,
    require: true
  },
  expense:{
    type: String,
    require: true
  },
  date:{
    type: Date,
    require: true
  }
})

module.exports = mongoose.model('Expense', expSchema)