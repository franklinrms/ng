import React from "react";
import { VscLoading } from "react-icons/vsc";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
 from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 0.7s linear infinite;
  padding: 0;
  font-size: 2rem;
`;

export default function Loading() {
  return (
    <Wrapper>
      <VscLoading />
    </Wrapper>
  );
}
