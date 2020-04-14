import styled, { css } from "styled-components";

import { ReactComponent as LogoSVG } from "assets/brand.svg";

import { getColor, getFontFamily, getFontSize } from "ui/helpers";

export const AppRoot = styled.div`
  min-height: 100vh;
  font-size: ${getFontSize("default")};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${getFontFamily("default")};
  overflow-x: hidden;
  @media screen and (max-width: 600px) {
    font-size: ${getFontSize("sm")};
  }
`;

export const AppBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-image: linear-gradient(
    to bottom right,
    #786dff 30%,
    palevioletred
  );
  z-index: 2;
`;

export const Logo = styled(LogoSVG)`
  color: ${getColor("white")};
  width: 10rem;
`;

export const Button = styled.button`
  height: 3rem;
  width: 10rem;
  border-radius: 1.5rem;
  background: ${getColor("white")};
  border: solid 0.1rem white;
  color: ${getColor("white")};
  outline: none;
  font-weight: 700;
  @media screen and (max-width: 600px) {
    width: 90vw;
  }
  background-image: linear-gradient(to right, #786dff 30%, palevioletred);
`;

export const Clamp = styled.div<{ withPadding?: boolean }>`
  display: flex;
  width: 1024px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    width: 100vw;
  }
  ${(p) =>
    p.withPadding
      ? css`
          padding-left: 1rem;
          padding-right: 1rem;
        `
      : ""};
`;

export const Body = styled.main`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
