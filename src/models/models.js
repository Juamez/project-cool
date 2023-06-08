const mongoose = require('mongoose')
const crypto = require('crypto')
require('dotenv').config()

const {
  goalTypeSchema, 
  reminderSchema, 
  personalGoalSchema, 
  userSchema
} = require('../schemas/schema')
const dateInFiveMonths = require('../utils/date')

const generateHashedPassword = require('../utils/randomHash')

const password = process.env.PASSWORD
const salt = crypto.randomBytes(16).toString('hex')

const GoalType = mongoose.model('GoalType', goalTypeSchema)
const Reminder = mongoose.model('Reminder', reminderSchema)
const PersonalGoal = mongoose.model('PersonalGoal', personalGoalSchema)
const User = mongoose.model('User', userSchema)

async function createUser() {
  const fitnessCategory = new GoalType({
    id: 1,
    name: 'idioms',
  })
  
  const reminder = new Reminder({
    weekly: true,
  })
  
  const personalGoal = new PersonalGoal({
    title: 'Gain 200pound in six months',
    description: 'Give my best to finished my bulk fase with more that 200 pounds in gains, yikes!',
    goal_type: fitnessCategory,
    end_date_goal: dateInFiveMonths,
    reminder_type: reminder
  })
  
  const userJhon = new User({
    name: 'Jessey',
    avatar: 'https://placeimg.com/640/480/any?r=0.9178516507833745',
    email: 'jesseey@gmail.com',
    password: generateHashedPassword(password, salt),
    streak_count: 0,
    goal_info: personalGoal
  })
  
  await fitnessCategory.save()
  await reminder.save()
  await personalGoal.save()
  await userJhon.save()
}

module.exports = {User, createUser}