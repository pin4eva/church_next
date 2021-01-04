import sermonResolver from "./sermonResolver";
import user from "./userResolver";

export default {
  Query: {
    ...user.Query,
    ...sermonResolver.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...sermonResolver.Mutation,
  },
};
