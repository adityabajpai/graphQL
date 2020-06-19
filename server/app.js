const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const schema = require('./schema/schema')
const test_schema = require('./schema/types_schema')

mongoose.connect(process.env.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open',()=>{
    console.log('Yes we are connected!')
})

app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(4000, ()=>{
    console.log('listening for request')
})