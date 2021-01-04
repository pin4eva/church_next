import { gql, makeExecutableSchema } from "apollo-server-micro";
import resolvers from "../resolvers";
import { DevotionalTypes } from "./devotionalType";
import { SermonTypes } from "./sermonTypes";
import { UserTypes } from "./userTypes";

const typeDefs = gql`
  scalar Date

  # INPUT TYPES

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, UserTypes, DevotionalTypes, SermonTypes],
  resolvers,
});

export default typeDefs;
