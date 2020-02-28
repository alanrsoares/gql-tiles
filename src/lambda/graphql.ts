import { context, createServer } from "../graphql";

const server = createServer(context);

exports.handler = server.createHandler();
