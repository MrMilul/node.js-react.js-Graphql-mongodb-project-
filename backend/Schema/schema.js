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

const TeacherType = new GraphQLObjectType({
    name: "teacher", 
    fields: ()=>({
        id: {type: GraphQLID}, 
        fullName: {type: GraphQLString},
        group: {type: GraphQLString}
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})