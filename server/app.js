const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema/schema')
const test_schema = require('./schema/types_schema')

const app = express()
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: test_schema
}))

app.listen(4000, ()=>{
    console.log('listening for request')
})