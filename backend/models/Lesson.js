const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LessonSchema = new Schema({
    lesson: String,
    group: String, 
    teacherId: String
})

module.exports = mongoose.model("Lesson", LessonSchema)