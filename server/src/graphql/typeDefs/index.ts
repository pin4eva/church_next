import { gql, makeExecutableSchema } from "apollo-server-express";
import { userTypes } from "./userTypes";
import resolvers from "../resolvers";
import { SermonTypes } from "./sermonTypes";
import { DevotionalTypes } from "./devotionalType";
// const userTypes = join(process.cwd(), "src/userTypes.gql");

const typeDefs = gql`
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, userTypes, SermonTypes, DevotionalTypes],
  resolvers,
});
