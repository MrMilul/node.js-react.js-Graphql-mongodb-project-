const mongoose = require('mongoose')
const schema = mongoose.Schema

const TeacherSchema = new Schema({
    fullName:String, 
    group:String
})

module.exports = mongoose.model('TeacherList', TeacherSchema)