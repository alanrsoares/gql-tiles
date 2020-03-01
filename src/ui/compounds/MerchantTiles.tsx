import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled, { css } from "styled-components";
import range from "ramda/es/range";
import Skeleton from "react-loading-skeleton";

import { ReactComponent as CircleIcon } from "assets/circle.svg";

import { Tile } from "graphql/tiles/types";
import { getRadius, getColor, getFontSize } from "ui/helpers";
import { Button } from "ui/components";

const Circle = styled(CircleIcon)`
  color: ${getColor("brand")};
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 6rem);
  @media screen and (max-width: 1024px) {
    justify-content: space-between;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TileFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
`;

const TileTitle = styled.div`
  font-size: ${getFontSize("lg")};
`;

const TileTag = styled.div`
  font-size: ${getFontSize("sm")};
  color: ${getColor("gray")};
`;

const EllipsisWrapper = styled.div`
  display: inline-block;
  margin: 0.2rem;
`;

const TileCard = styled.div<{ src?: string; skeleton?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 249.5px;
  height: 180px;
  border-radius: ${getRadius("lg")};
  background-repeat: no-repeat;
  background-color: ${getColor("gray")};
  background-image: ${p => (p.skeleton ? "" : css`url(${p.src})`)};
  background-size: cover;
  background-position: center;
  margin: 0.2rem;
  overflow: hidden;
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

  :hover {
    opacity: 0.6;
  }

  transition: all 0.3s ease-in;
`;

export const Footer = styled.div`
  margin-top: 1rem;
`;

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

interface Props {}

const PlaceHolder: React.FC<{ size: number }> = props => {
  return (
    <>
      {range(0, props.size).map(i => (
        <TileContainer key={`card-${i}`}>
          <TileCard skeleton>
            <Skeleton width={400} height={400} />
          </TileCard>
          <TileFooter>
            <Circle />
          </TileFooter>
        </TileContainer>
      ))}
    </>
  );
};

const MerchantTiles: React.FC<Props> = props => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);

  const { loading, error, data, fetchMore } = useQuery<{ getTiles: Tile[] }>(
    GET_TILES,
    {
      fetchPolicy: "cache-and-network"
    }
  );

  useEffect(() => {
    if (pageNumber === 1) return;

    fetchMore({
      variables: { pageNumber, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          getTiles: prev.getTiles.concat(fetchMoreResult.getTiles)
        };
      }
    });
  }, [fetchMore, pageNumber, pageSize]);

  const handleLoadMore = useCallback(() => {
    if (loading) return;
    setPageNumber(p => p + 1);
  }, [loading]);

  const content = useMemo(() => {
    if (error) return <div>Error :(</div>;

    return (
      <ListContainer>
        {data?.getTiles.map(tile => (
          <TileContainer key={tile.id}>
            <TileCard src={tile.currentTileUrl}></TileCard>
            <TileFooter>
              <TileTitle>{tile.name}</TileTitle>
              {tile.instore && (
                <TileTag>
                  <Skeleton
                    circle
                    wrapper={EllipsisWrapper}
                    width=".8rem"
                    height=".8rem"
                  />
                  Also in store
                </TileTag>
              )}
            </TileFooter>
          </TileContainer>
        ))}
        {loading && <PlaceHolder size={pageSize} />}
      </ListContainer>
    );
  }, [loading, data, error, pageSize]);

  return (
    <Root>
      {content}
      <Footer>
        <Button onClick={handleLoadMore}>
          {loading ? "Loading..." : "Load more"}
        </Button>
      </Footer>
    </Root>
  );
};

export default MerchantTiles;
