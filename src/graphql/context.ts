import * as tilesApi from "./tiles/api";

export interface Context {
  api: { tiles: typeof tilesApi };
  logger: { log: typeof console.log };
}

const context: Context = {
  api: { tiles: tilesApi },
  logger: { log: console.log }
};

export default context;
