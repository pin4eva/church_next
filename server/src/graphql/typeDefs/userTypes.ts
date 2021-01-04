import { gql } from "apollo-server-express";

export const userTypes = gql`
  type User {
    _id: ID
    name: String
    email: String
    position: String
    phone: String
    address: String
    token: String
    role: String
    isActive: Boolean
    image: String
    fellowship: String
    department: String
    branch: String
    firstName: String
    lastName: String
  }

  type Token {
    token: String
    user: User
  }

  extend type Query {
    # Users Query
    getUsers: [User]
    me(token: String): User
    auth: User
    getUser(_id: ID): User
  }

  extend type Mutation {
    # User Mutations
    signup(input: SignupInput): User
    login(email: String, password: String): Token
    updateUser(input: UserInput): User
    deleteUser(_id: ID): User
    verify(token: String): User
    forgotPassword(token: String, password: String): User
    changePassword(_id: ID, password: String): User
    checkEmail(email: String): User
    changeRole(_id: ID!, role: String!): User

    setTarget(target: Int, _id: ID): User
  }

  extend type Subscription {
    loggedIn: User
  }

  input UserInput {
    _id: ID
    name: String
    email: String
    position: String
    phone: String
    address: String
    token: String
    role: String
    isActive: Boolean
    image: String
    fellowship: String
    department: String
    branch: String
    firstName: String
    lastName: String
  }

  input SignupInput {
    _id: ID
    name: String
    email: String
    position: String
    phone: String
    address: String
    token: String
    role: String
    isActive: Boolean
    image: String
    fellowship: String
    department: String
    branch: String
    password: String
    firstName: String
    lastName: String
  }
`;
