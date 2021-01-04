import FrontHeader from "components/FrontHeader";
import React from "react";
import styled from "styled-components";

const prayer = () => {
  return (
    <Wrapper>
      <header>
        <FrontHeader />
      </header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    background: url("prayer-bg.png") no-repeat;
    background-position: center;
    background-size: cover;
    @media screen and (min-width: 768px) {
      height: 258px;
    }
  }
`;

export default prayer;
