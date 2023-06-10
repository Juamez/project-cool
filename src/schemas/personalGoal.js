const mongoose = require('mongoose')
const { Schema } = mongoose

const personalGoalSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  goal_type: {type: Schema.Types.ObjectId, ref:"GoalType"},
  start_date_goal: {type: Date, default: Date.now },
  end_date_goal: Date,
  reminder_type: {type: Schema.Types.ObjectId, ref:"Reminder"},
})

const PersonalGoal = mongoose.model('PersonalGoal', personalGoalSchema)

module.exports = PersonalGoal