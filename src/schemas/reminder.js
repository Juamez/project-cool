const mongoose = require('mongoose')
const { Schema } = mongoose

const reminderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  reminder: {
    type: String,
    required: true,
    unique: true,
    enum: ["daily", "weekly", "monthly"],
    default: "daily",
  },
})

const Reminder = mongoose.model('Reminder', reminderSchema)

module.exports = Reminder