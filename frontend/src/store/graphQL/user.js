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

export const GET_USER = gql`
  query {
    user: getUser {
      id
      username
      email
    }
  }
`;
