const mongoose = require('mongoose')
const { Schema } = mongoose

const personalGoalSchema = new Schema({
  _id: Schema.Types.ObjectId,
  owner_id: { type: Schema.Types.ObjectId, ref: "UserStoreSession"},
  title: String,
  description: String,
  goal_type: {type: String, ref:"GoalType"},
  start_date_goal: {type: Date, default: Date.now },
  end_date_goal: Date,
  reminder_type: {type: String, ref:"Reminder"},
})

const PersonalGoal = mongoose.model('PersonalGoal', personalGoalSchema)

module.exports = PersonalGoal