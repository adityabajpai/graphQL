const graphql = require('graphql')
var _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = graphql

// dummy data

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Using computer to make the world a better palce', userId: '150'},
    {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts', userId: '211'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211'},
    {id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '13'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150'},
]

var userData = [
    {id: '1', name: 'Bond', age: 36, profession: 'Programmer'},
    {id: '13', name: 'Anna', age: 26, profession: 'Baker'},
    {id: '211', name: 'Bella', age: 16, profession: 'Mechanic'},
    {id: '19', name: 'Gina', age: 26, profession: 'Painter'},
    {id: '150', name: 'Georgina', age: 36, profession: 'Teacher'},
]

var postsData = [
    {id: '1', comment: 'Building a mind', userId: '1'},
    {id: '2', comment: 'GraphQL is amazing', userId: '1'},
    {id: '3', comment: 'how to change the world', userId: '19'},
    {id: '4', comment: 'how to change the world', userId: '211'},
    {id: '5', comment: 'how to change the world', userId: '1'}
]

// Create Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation of User...',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, {userId: parent.id})
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {userId: parent.id})
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: ()=>({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: ()=>({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

//Root Query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType, // connecting query with the defined type
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // we resolve with data
                // get and return data from a datasource
                return _.find(userData, {id: args.id})
                
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userData
            }
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return data for our hobby
                return _.find(hobbiesData, {id: args.id})
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData
            } 
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return post Data
                return _.find(postsData, {id: args.id})
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postsData
            } 
        },
    }
})

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        // create User
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user
            }
        },
        // create Post
        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID},
                comment: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }
                return post
            }
        },
        // create Hobby
        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return hobby
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})