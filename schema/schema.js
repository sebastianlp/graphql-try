// application looks like
const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Samantha', age: 21 },
];

// Le dice a GraphQL como es un user
const UserType = new GraphQLObjectType({
  name: 'User', // El nombre del type
  fields: { // las propiedades que tiene el user
    id: {
      type: GraphQLString // El tipo de la propiedad
    },
    firstName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

// Query que es el punto de entrada a nuestra data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { // los argumentos a pasar
        id: { // Podes pasarme el ID del usuario a buscar
          type: GraphQLString // El cual es del tipo string
        }
      },
      resolve (parentValue, args) { // como bindea la data con el UserType
        // en args vienen los parametros que nos pasan para hacer una query por ejemplo
        return _.find(users, { id: args.id }); // esto seria una query ja
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
