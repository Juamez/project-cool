require('dotenv').config()
const GoalType = require('../schemas/goalType')
const Reminder = require('../schemas/reminder')
const PersonalGoal = require('../schemas/personalGoal')
const {User, UserCredentials} = require('../schemas/user')

const mongoose = require('mongoose')

async function createReminders() {
  const reminder = new Reminder({
    _id: new mongoose.Types.ObjectId(),
  })
  return await reminder.save()
}

async function createGoalType(name) {
  const category = new GoalType({
    _id: new mongoose.Types.ObjectId(),
    id: 0,
    name: name,
  })
  return await category.save()
}

async function createPersonalGoal(userId, titleName, description, CategoryId, endDate, reminderId) {
  const personalGoal = new PersonalGoal({
    _id: new mongoose.Types.ObjectId(),
    owner_id: userId,
    title: titleName,
    description: description,
    goal_type: CategoryId,
    end_date_goal: endDate,
    reminder_type: reminderId
  })
  return await personalGoal.save()
}

async function createUser(name, avatar, email, password, personalGoalId) {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    avatar: avatar,
    email: email,
    password: password,
    streak_count: 0,
    goal_info: personalGoalId
  })

  return await user.save()
}

async function createUserCredentials(username, password) {
  const userCredentials = new UserCredentials({
    _id: new mongoose.Types.ObjectId,
    username: username,
    password: password,
  })
  return await userCredentials.save()
}

async function createUserPersona() {
  const savedReminder = await createReminders()
  const savedGoalType = await createGoalType()
  const savedPersonalGoal = await createPersonalGoal(savedGoalType._id, savedReminder._id)
  const savedUser = await createUser(savedPersonalGoal._id)
  return savedUser
}

module.exports = {createUserPersona, createUserCredentials, createPersonalGoal}