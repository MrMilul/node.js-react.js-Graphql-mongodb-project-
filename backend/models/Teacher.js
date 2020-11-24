const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeacherSchema = new Schema({
    fullName:String, 
    group:String
})

module.exports = mongoose.model('Teacher', TeacherSchema)