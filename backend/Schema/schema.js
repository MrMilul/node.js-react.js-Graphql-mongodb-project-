const graphql = require("graphql");
const lod = require('lodash')
const {
GraphQLObjectType,
GraphQLID, 
GraphQLString,
GraphQLSchema,
GraphQLList
} = graphql;


const TeacherList = [
    {id:"1", fullName:"Milad Mizani", group:"Fullstack"},
    {id:"2", fullName:"Ali Alaei", group:"frontend"},
    {id:"3", fullName:"Mohamad Rabie", group:"backend"},
]
const LessonList = [
    {id:"1", lesson:"Graphql", group:"IT", teacherId:"1"},
    {id:"2", lesson:"Vue.js", group:"IT", teacherId:"3"},
    {id:"3", lesson:"React.js", group:"IT", teacherId:"2"},
    {id:"4", lesson:"Node.js", group:"IT", teacherId:"1"},
]

const TeacherType = new GraphQLObjectType({
    name: "teacher", 
    fields: ()=>({
        id: {type: GraphQLID}, 
        fullName: {type: GraphQLString},
        group: {type: GraphQLString}, 
        lesson:{
            type:LessonType, 
            resolve(parent, args){
                return lod.filter(LessonList, {id: parent.id})
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
                return lod.find(TeacherList, {id: parent.teacherId})
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
                return lod.find(TeacherList, {id:args.id})
            }
        }, 
        teachers:{
            type: new GraphQLList (TeacherType), 
            resolve(){
                return TeacherList
            }
        },
        lesson:{
            type: LessonType,
            args: {id:{type:GraphQLID}}, 
            resolve(parent, args){
                return lod.find(LessonList, {id:args.id})
            }
        }, 
        lessons:{
            type: new GraphQLList(LessonType), 
            resolve(){
                return LessonList
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})