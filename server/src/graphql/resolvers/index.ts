import sermonResolver from "./sermonResolver";
import userResolver from "./userResolver";
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
  Subscription: {
    ...user.Subscription,
  },
};
