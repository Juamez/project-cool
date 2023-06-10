const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  description: String,
  avatar: String,
  email: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  streak_count: Number,
  profile_created: {type: Date, default: Date.now },
  goal_info: [{type: Schema.Types.ObjectId, ref: "PersonalGoal"}],
}, { collection: 'users'})

const userCredentialsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true}
}, {collection: 'user_credentials'})

const User = mongoose.model('User', userSchema)
const UserCredentials = mongoose.model('User_credentials', userCredentialsSchema)

module.exports = {User, UserCredentials}