import { ApolloServer } from "apollo-server-micro";
import { connectDB } from "apollo/db";
import { schema } from "apollo/graphql/typeDefs";

connectDB();

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const { authorization } = req.headers;
    return {
      res,
      req,
      token: authorization,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
