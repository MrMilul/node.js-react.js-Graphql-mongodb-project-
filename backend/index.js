const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors')

const schema = require("./Schema/schema");


app.use(cors())
app.use("/graphql", graphqlHTTP({
    schema: schema, 
    graphiql: true,
}))

mongoose.connect("mongodb+srv://milad:milad123456@cluster0.fy4sm.mongodb.net/<graphql>?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.connection.once('open', () => {
    console.log("DB connected")
})

app.listen(3001, ()=>{
    console.log("We are on a localhost 3001")
})