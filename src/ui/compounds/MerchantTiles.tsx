import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

import { Tile } from "graphql/tiles/types";
import { getRadius, getColor } from "ui/helpers";
import { Button } from "ui/components";

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const TileContainer = styled.div<{ src: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  background-color: ${getColor("gray")};
  border-radius: ${getRadius("lg")};
  background-image: url(${p => p.src});
  background-size: cover;
  margin: 0.2rem;
  @media screen and (max-width: 600px) {
    width: calc(50vw - 0.6rem);
  }
`;

const GET_TILES = gql`
  {
    getTiles {
      id
      name
      tileImage
      online
      instore
    }
  }
`;

interface Props {}

const MerchantTiles: React.FC<Props> = props => {
  const { loading, error, data } = useQuery<{ getTiles: Tile[] }>(GET_TILES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :( {JSON.stringify(error)}</div>;

  return (
    <Root>
      <ListContainer>
        {data?.getTiles.map(tile => (
          <TileContainer src={tile.tileImage} key={tile.id}></TileContainer>
        ))}
      </ListContainer>
      <div>
        <Button>More stores</Button>
      </div>
    </Root>
  );
};

export default MerchantTiles;
