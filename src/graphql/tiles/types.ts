import { Tile as _Tile, QueryGetTilesArgs } from "../../generated/graphql";

export type Tile = _Tile;

export type GetTilesParams = QueryGetTilesArgs;

export interface TileAttributes {
  name: string;
  internalName: string;
  url: string;
  utmSource: string;
  tagMatch: boolean;
  utmMedium: string;
  utmCampaign: string;
  activeStartsAt: string;
  activeEndsAt: string | null;
  instore: boolean;
  online: boolean;
  global: boolean;
  comingSoon: boolean;
  logoImage: string | null;
  currentTileUrl: string;
  currentLogoUrl: string | null;
  currentUrl: string;
  status: string;
  tileImage: { url: string };
}

export type TileRelationship =
  | "categories"
  | "merchant"
  | "activePromotion"
  | "tileTags";

export interface TileApiResponse {
  data: TileDto[];
  meta: { pageSize: number; pageNumber: number };
}

export interface TileDto {
  id: string;
  type: string;
  attributes: TileAttributes;
}
