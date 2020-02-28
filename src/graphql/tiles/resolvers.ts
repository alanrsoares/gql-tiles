import { IResolvers } from "apollo-server-lambda";

import { Context } from "../context";
import { GetTilesParams } from "./types";

import { dtoToTile } from "./transformers";

const resolvers: IResolvers<unknown, Context> = {
  Query: {
    async getTiles(_parent, params: GetTilesParams, ctx) {
      try {
        const response = await ctx.api.tiles.fetchWithPagination(params);
        return response.data.map(dtoToTile);
      } catch (error) {
        ctx.logger.log("Failed to fetch tiles");
        return [];
      }
    }
  }
};

export default resolvers;
