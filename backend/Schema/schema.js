const graphql = require("graphql");
const lod = require('lodash')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema,
GraphQLList, GraphQLNonNull } = graphql;

const Teacher = require("../models/Teacher")
const Lesson = require("../models/Lesson")


const TeacherType = new GraphQLObjectType({
    name: "teacher", 
    fields: ()=>({
        id: {type: GraphQLID}, 
        fullName: {type: GraphQLString},
        group: {type: GraphQLString}, 
        lesson:{
            type:LessonType, 
            resolve(parent, args){
                return Lesson.find({teacherId: parent.id})
            }
        }
    })
})

const LessonType = new GraphQLObjectType({
    name:'lesson', 
    fields:()=>({
        id: {type: GraphQLID}, 
        lesson: {type: GraphQLString},
        group: {type: GraphQLString}, 
        teacherId:{type: GraphQLID}, 
        teacher:{
            type: TeacherType,
            resolve(parent, args){
                return Teacher.findById(parent.teacherId)
            }
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType", 
    fields: {
        teacher:{
            type:TeacherType, 
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Teacher.findById(args.id)
            }
        }, 
        teachers:{
            type: new GraphQLList (TeacherType), 
            resolve(){
                return Teacher.find({})
            }
        },
        lesson:{
            type: LessonType,
            args: {id:{type:GraphQLID}}, 
            resolve(parent, args){
                return Lesson.findById(args.id)
            }
        }, 
        lessons:{
            type: new GraphQLList(LessonType), 
            resolve(){
                return Lesson.find({})
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name:"Mutanion",
    fields:{
        AddTeacher:{
            type:TeacherType, 
            args:{
                fullName: {type: new GraphQLNonNull (GraphQLString)},
                group: {type: GraphQLString}, 
            },
            resolve(parent, args){
                let teacher = new Teacher({
                    fullName: args.fullName,
                    group: args.group
                })
                return teacher.save()
            }
        }, 
        AddLesson:{
            type:LessonType,
            args:{
                lesson: {type: new GraphQLNonNull (GraphQLString)},
                group: {type: new GraphQLNonNull (GraphQLString)}, 
                teacherId:{type: new GraphQLNonNull(GraphQLID)}, 
            }, 
            resolve(parent, args){
                let lesson = new Lesson({
                    lesson: args.lesson, 
                    group: args.group, 
                    teacherId: args.teacherId
                })
                return lesson.save()
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})