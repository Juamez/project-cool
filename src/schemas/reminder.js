const mongoose = require('mongoose')
const { Schema } = mongoose

const reminderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  reminder: {
    type: String,
    required: true,
    unique: true,
    enum: ["Daily", "Weekly", "Monthly"],
    default: "Daily",
  },
})

const Reminder = mongoose.model('Reminder', reminderSchema)

module.exports = Reminder