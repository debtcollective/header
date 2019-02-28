import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  animation: ${animation} infinite 20s linear;
  height: 40vmin;
`;

export const Container = styled.header`
  background-color: #282c34;
  border-radius: 4px;
  min-height: 200px;
  font-size: calc(10px + 2vmin);
  color: white;
`;
