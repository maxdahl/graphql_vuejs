require("dotenv").config();

import mongoose from "mongoose";
const initMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      autoIndex: true
    });

    console.log("connected to database");
  } catch (err) {
    console.log("DB ERROR", err);
    process.exit();
  }
};

initMongo();

import { GraphQLServer } from "graphql-yoga";
import api from "./api";

const server = new GraphQLServer({
  typeDefs: api.schema,
  resolvers: api.resolvers,
  context: req => ({
    ...req,
    api
  })
});

import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import { szeTime } from "szeutils";

const MongoStore = require("connect-mongo")(session);

server.express.use(helmet());
server.express.use(
  cors({
    credentials: true
  })
);

server.express.use(
  session({
    cookie: {
      maxAge: szeTime.toMs({ h: 1 })
    },
    resave: false,
    name: "sessioncookie",
    secret: process.env.SESSION_SECRECT,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secure: process.env.USE_HTTPS
  })
);

const startServer = async () => {
  await server.start({ port: process.env.PORT });
  console.log(`Server is running on port ${process.env.PORT}`);
};

startServer();
