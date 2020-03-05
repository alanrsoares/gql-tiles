import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Tile } from "./tiles/types";

type PartialTile = Pick<
  Tile,
  "id" | "name" | "currentUrl" | "online" | "instore" | "currentTileUrl"
>;

export interface GetTilesData {
  getTiles: PartialTile[];
}

export interface GetTilesVars {
  pageNumber: number;
  pageSize: number;
}

const GET_TILES = gql`
  query GetTiles($pageNumber: Int! = 1, $pageSize: Int! = 8) {
    getTiles(pageNumber: $pageNumber, pageSize: $pageSize) {
      id
      name
      currentUrl
      currentTileUrl
      online
      instore
    }
  }
`;

export function useTiles(variables: GetTilesVars) {
  return useQuery<GetTilesData, GetTilesVars>(GET_TILES, {
    variables,
    fetchPolicy: "cache-and-network"
  });
}
