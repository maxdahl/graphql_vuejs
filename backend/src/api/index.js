import { mergeTypes } from "merge-graphql-schemas";
import { szeGraphQL } from "szeutils";

import user from "./user";

const typeDefs = [user.schema];
const resolverDefs = [user.resolvers];

const schema = mergeTypes(typeDefs, { all: true });
const resolvers = szeGraphQL.mergeResolvers(resolverDefs);

export default {
  schema,
  resolvers,
  user: user.model
};
