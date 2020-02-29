import styled from "styled-components";

import { ReactComponent as LogoSVG } from "assets/brand.svg";

import { getColor } from "ui/helpers";

export const AppRoot = styled.div`
  height: 100vh;
  border: solid 1px red;
  font-size: 16px;
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
  height: 2rem;
`;
