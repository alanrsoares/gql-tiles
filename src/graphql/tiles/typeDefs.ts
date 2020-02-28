import { gql } from "apollo-server-lambda";

export default gql`
  enum TileRelationship {
    categories
    merchant
    activePromotion
    tileTags
  }

  type Tile {
    id: String!
    type: String!
    name: String!
    internalName: String!
    url: String!
    tileImage: String
    utmSource: String!
    tagMatch: Boolean
    utmMedium: String
    utmCampaign: String
    activeStartsAt: String
    activeEndsAt: String
    instore: Boolean!
    online: Boolean
    global: Boolean
    comingSoon: Boolean
    logoImage: String
    currentTileUrl: String
    currentLogoUrl: String
    currentUrl: String
    status: String!
  }

  type Query {
    getTiles(
      pageSize: Int = 10
      pageNumber: Int = 1
      include: TileRelationship
    ): [Tile!]!
  }
`;
