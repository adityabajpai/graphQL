const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLNonNull
} = graphql

// Scalar Type
/*
    String = GraphQLString
    Int
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represent a person',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)}, // null not allowed (!)
        age: {type: new GraphQLNonNull(GraphQLInt)},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    name: 'Antonio',
                    age: 35,
                    isMarried: true,
                    gpa: 4.0
                }
                return personObj
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})