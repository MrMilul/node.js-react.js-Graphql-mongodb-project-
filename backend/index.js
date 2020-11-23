const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require("./Schema/schema");

app.use("/graphql", graphqlHTTP({
    schema: schema, 
    graphiql: true,
}))


app.listen(3001, ()=>{
    console.log("We are on a localhost 3001")
})