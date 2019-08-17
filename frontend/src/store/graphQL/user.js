import gql from "graphql-tag";

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const GET_USER = gql`
  query {
    user: getUser {
      id
      username
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: ID!, $data: UpdateUserInput!) {
    user: updateUser(id: $id, data: $data) {
      id
      username
      email
    }
  }
`;
