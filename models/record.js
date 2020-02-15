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
    type: Number,
    require: true
  },
  date:{
    type: Date,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", //屬性由User這個model取得
    index: true, //設userId為索引，用來查詢資料
    required: true
  }
})

module.exports = mongoose.model('Expense', expSchema)