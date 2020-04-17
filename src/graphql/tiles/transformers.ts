import { TileDto, Tile } from "./types";

export const dtoToTile = (entry: TileDto): Tile => ({
  id: entry.id,
  type: entry.type,
  ...entry.attributes,
  tileImage: entry.attributes.tileImage.url,
});
