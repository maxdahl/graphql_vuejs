export default `
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type Query {
    getUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    login(email: String!, password: String!): User!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
  }
`;
