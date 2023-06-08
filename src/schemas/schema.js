const mongoose = require('mongoose')
const { Schema } = mongoose

const goalTypeSchema = new Schema({
  id: Number,
  name: String,
})

const reminderSchema = new Schema({
  daily: Boolean,
  weekly: Boolean,
  monthly: Boolean,
})

const personalGoalSchema = new Schema({
  title: String,
  description: String,
  goal_type: goalTypeSchema,
  start_date_goal: {type: Date, default: Date.now },
  end_date_goal: Date,
  reminder_type: reminderSchema,
})

const userSchema = new Schema({
  name: String,
  description: String,
  avatar: String,
  email: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  streak_count: Number,
  profile_created: {type: Date, default: Date.now },
  goal_info: personalGoalSchema,
}, { collection: 'users'})

module.exports = { 
  goalTypeSchema,  
  userSchema, 
  reminderSchema, 
  personalGoalSchema,
}