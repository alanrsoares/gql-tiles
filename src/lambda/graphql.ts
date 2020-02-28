import context from "../graphql/context";
import createServer from "../graphql/createServer";

const server = createServer(context);

exports.handler = server.createHandler();
