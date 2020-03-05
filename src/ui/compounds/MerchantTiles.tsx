import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled, { css } from "styled-components";
import range from "ramda/es/range";
import Skeleton from "react-loading-skeleton";

import { ReactComponent as CircleIcon } from "assets/circle.svg";

import { Tile } from "graphql/tiles/types";
import { getRadius, getColor } from "ui/helpers";
import { Button } from "ui/components";

const Circle = styled(CircleIcon)`
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.4rem;
  color: ${getColor("brand")};
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

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

const TileOverlay = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${getColor("shadow")};
  visibility: hidden;
  transition: visibility 0.3s ease-in;
`;

const TileOverlayLink = styled.a`
  background-image: linear-gradient(to right, #786dff 40%, palevioletred);
  width: 85%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  color: ${getColor("white")};
  text-decoration: none;
  font-weight: 700;
  outline: none;
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
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
`;

const TileTag = styled.div`
  font-size: 0.8rem;
  color: ${getColor("gray")};
`;

const EllipsisWrapper = styled.div`
  display: inline-block;
  margin: 0.2rem;
`;

const TileCard = styled.div<{ src?: string; skeleton?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 249.5px;
  height: 180px;
  border-radius: ${getRadius("xl")};
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

  transition: all 0.3s ease-in;

  :hover {
    opacity: 0.9;
    ${TileOverlay} {
      visibility: visible;
    }
  }
`;

export const Footer = styled.div`
  margin: 1rem 0;
`;

type PartialTile = Pick<
  Tile,
  "id" | "name" | "currentUrl" | "online" | "instore" | "currentTileUrl"
>;

interface GetTilesData {
  getTiles: PartialTile[];
}

interface GetTilesVars {
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

interface Props {}

const PAGE_SIZE = 8;

const PlaceHolder: React.FC<{ size: number }> = props => {
  return (
    <>
      {range(0, props.size).map(i => (
        <TileContainer key={`card-${i}`}>
          <TileCard skeleton>
            <Skeleton width={400} height={400} />
          </TileCard>
          <TileFooter>
            <Skeleton
              circle
              wrapper={EllipsisWrapper}
              width="1rem"
              height="1rem"
              count={3}
            />
          </TileFooter>
        </TileContainer>
      ))}
    </>
  );
};

const MerchantTiles: React.FC<Props> = _props => {
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, data, fetchMore } = useQuery<
    GetTilesData,
    GetTilesVars
  >(GET_TILES, {
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (pageNumber === 1) return;

    fetchMore({
      variables: { pageNumber },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          getTiles: prev.getTiles.concat(fetchMoreResult.getTiles)
        };
      }
    });
  }, [fetchMore, pageNumber]);

  const handleLoadMore = useCallback(() => {
    if (loading) return;

    setPageNumber(p => p + 1);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }, [loading]);

  const content = useMemo(() => {
    if (error) return <div>Error :(</div>;

    return (
      <ListContainer>
        {data?.getTiles.map(tile => (
          <TileContainer key={tile.id}>
            <TileCard src={tile.currentTileUrl}>
              <TileOverlay>
                <TileOverlayLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href={tile.currentUrl}
                >
                  Shop Here
                </TileOverlayLink>
              </TileOverlay>
            </TileCard>
            <TileFooter>
              <TileTitle>{tile.name}</TileTitle>
              {tile.instore && (
                <TileTag>
                  <Circle />
                  Also in store
                </TileTag>
              )}
            </TileFooter>
          </TileContainer>
        ))}
        {loading && <PlaceHolder size={PAGE_SIZE} />}
      </ListContainer>
    );
  }, [loading, data, error]);

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
