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

export interface Tile extends Omit<TileAttributes, "tileImage"> {
  id: string;
  type: string;
  tileImage: string;
}

export type GetTilesParams = Partial<{
  pageSize: number;
  pageNumber: number;
  include: TileRelationship;
}>;
