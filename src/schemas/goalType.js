const mongoose = require('mongoose')
const { Schema } = mongoose

const goalTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: Number,
  name: {type: String, unique: true},
})

const GoalType = mongoose.model('GoalType', goalTypeSchema)

module.exports = GoalType