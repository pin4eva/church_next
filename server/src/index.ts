import { ApolloServer, PubSub } from "apollo-server-express";
import express, { Response } from "express";
import { schema } from "./graphql/typeDefs";
import { connectDB } from "./utils/db";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
const PORT = process.env.PORT || 8000;
export const pubSub = new PubSub();

const app = express();
app.use(cors());
app.use(cookieParser());
const server = createServer(app);

app.get("/", (_, res: Response) => {
  res.send("Hello");
});

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const token = req.headers.authorization;
    return {
      res,
      req,
      token,
    };
  },
  playground: true,
  introspection: true,
  subscriptions: {
    path: "/api/graphql",
    onConnect: () => console.log("ws: connected"),
  },
});

apolloServer.applyMiddleware({
  app,
  path: "/api/graphql",
  bodyParserConfig: { limit: "100mb" },
  // cors: {
  //   origin: [
  //     "http://localhost:3000",
  //     "https://jointheirsassembly.org",
  //     "https://dev.jointheirsassembly.org",
  //   ],
  // },
});

const start = async () => {
  await connectDB();
  try {
    server.listen(PORT, () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
        },
        { server, path: "/api/graphql" }
      );
    });
    console.log(`server started on ${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
