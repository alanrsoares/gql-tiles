import styled from "styled-components";

import { ReactComponent as LogoSVG } from "assets/brand.svg";

import { getColor, getRadius } from "ui/helpers";

export const AppRoot = styled.div`
  height: 100vh;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AppBar = styled.div`
  justify-content: space-between;
  padding: 0.5rem;
`;

export const Logo = styled(LogoSVG)`
  color: ${getColor("brand")};
  width: 10rem;
`;

export const Button = styled.button`
  height: 3rem;
  width: 10rem;
  border-radius: ${getRadius("xxxl")};
  background: ${getColor("white")};
  border: solid 0.1rem ${getColor("brand")};
  color: ${getColor("brand")};
  outline: none;
  @media screen and (max-width: 600px) {
    width: 90vw;
  }
`;

export const Clamp = styled.div`
  display: flex;
  width: 1024px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    width: 100vw;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

export const Body = styled.main`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
