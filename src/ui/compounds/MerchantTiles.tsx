import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

import { Tile } from "graphql/tiles/types";
import { getRadius, getColor } from "ui/helpers";
import { Button } from "ui/components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  width: 249.5px;
  height: 180px;
  background-color: ${getColor("gray")};
  border-radius: ${getRadius("lg")};
  background-image: url(${p => p.src});
  background-size: cover;
  background-size: center;
  margin: 0.2rem;
  @media screen and (max-width: 1024px) {
    width: calc(100vw / 4 - 1rem);
    height: calc(100vw / 4 - 1rem - 5vw);
  }
  @media screen and (max-width: 900px) {
    width: calc(100vw / 3 - 1rem);
    height: calc(100vw / 3 - 1rem - 10vw);
  }
  @media screen and (max-width: 600px) {
    width: calc(100vw / 2 - 1rem);
    height: calc(100vw / 2 - 1rem - 15vw);
  }
  @media screen and (max-width: 320px) {
    width: calc(100vw - 1rem);
    height: calc(100vw - 1rem - 20vw);
  }
`;

const GET_TILES = gql`
  query {
    getTiles(pageNumber: 1, pageSize: 8) {
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
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);

  const { loading, error, data } = useQuery<{ getTiles: Tile[] }>(GET_TILES, {
    variables: {
      pageSize,
      pageNumber
    }
  });

  const content = useMemo(() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error :( {JSON.stringify(error)}</div>;

    return (
      <ListContainer>
        {data?.getTiles.map(tile => (
          <TileContainer src={tile.tileImage} key={tile.id}></TileContainer>
        ))}
      </ListContainer>
    );
  }, [loading, error, data]);

  return (
    <Root>
      {content}
      <div>
        <Button onClick={() => setPageNumber(pageNumber + 1)}>Load more</Button>
      </div>
    </Root>
  );
};

export default MerchantTiles;
