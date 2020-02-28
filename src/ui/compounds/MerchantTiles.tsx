import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Tile } from "../../graphql/tiles/types";

const GET_TILES = gql`
  {
    getTiles {
      id
      name
    }
  }
`;

interface Props {}

const MerchantTiles: React.FC<Props> = props => {
  const { loading, error, data } = useQuery<{ getTiles: Tile[] }>(GET_TILES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :( {JSON.stringify(error)}</div>;

  return (
    <ul>
      {data?.getTiles.map(tile => (
        <li key={tile.id}>{tile.name}</li>
      ))}
    </ul>
  );
};

export default MerchantTiles;
