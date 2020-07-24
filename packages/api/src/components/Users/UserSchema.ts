import { gql } from 'apollo-server';

export default gql`
  type User {
    firstName: String!
    lastName: String!
    participation: Float!
  }

  type Query {
    listUsers(name: String): [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, participation: Float!): User
  }
`;
