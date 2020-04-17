import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import styled, { css } from "styled-components";
import range from "ramda/es/range";
import Skeleton from "react-loading-skeleton";

import { ReactComponent as CircleIcon } from "assets/circle.svg";

import { useWindowSize, usePrevious } from "lib/hooks";

import { getRadius, getColor } from "ui/helpers";
import { Button } from "ui/components";
import { useTiles } from "graphql/hooks";

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
  @media screen and (max-width: 600px) {
    padding-bottom: 6rem;
  }
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
  background-image: ${(p) => (p.skeleton ? "" : css`url(${p.src})`)};
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  @media screen and (max-width: 600px) {
    padding: 0.5rem;
    border-top: solid 0.01em ${getColor("shadow")};
    position: fixed;
    bottom: 0;
    background-color: rgba(240, 240, 240, 0.8);
    box-shadow: -1px -2px 2px rgba(100, 100, 100, 0.4);
  }
`;

interface Props {}

const PlaceHolder: React.FC<{ size: number }> = (props) => {
  return (
    <>
      {range(0, props.size).map((i) => (
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

const MerchantTiles: React.FC<Props> = (_props) => {
  const { innerWidth } = useWindowSize();

  const [pageNumber, setPageNumber] = useState(1);
  const previousPageNumber = usePrevious(pageNumber);
  const pageSize = useMemo(() => (innerWidth <= 600 ? 6 : 8), [innerWidth]);

  const { loading, error, data, fetchMore } = useTiles({
    pageNumber,
    pageSize,
  });

  useEffect(() => {
    const shouldSkipEffect =
      pageNumber === 1 || pageNumber === previousPageNumber;

    if (shouldSkipEffect) return;

    fetchMore({
      variables: { pageNumber, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          getTiles: prev.getTiles.concat(fetchMoreResult.getTiles),
        };
      },
    });
  }, [fetchMore, pageNumber, previousPageNumber, pageSize]);

  useLayoutEffect(() => {
    const shouldSkipEffect = pageNumber === 1 || !loading;

    if (shouldSkipEffect) return;

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 160 /* 10 frames merely cosmetic delay */);

    return () => {
      // effect cleanup
      clearTimeout(timeoutId);
    };
  }, [loading, pageNumber]);

  const handleLoadMore = useCallback(() => {
    if (loading) return;

    setPageNumber((x) => x + 1);
  }, [loading]);

  const content = useMemo(() => {
    if (error) return <div>Error :(</div>;

    return (
      <ListContainer>
        {data?.getTiles.map((tile) => (
          <TileContainer key={tile.id}>
            <TileCard src={String(tile.currentTileUrl)}>
              <TileOverlay>
                <TileOverlayLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href={String(tile.currentUrl)}
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
        {loading && <PlaceHolder size={pageSize} />}
      </ListContainer>
    );
  }, [loading, pageSize, data, error]);

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
