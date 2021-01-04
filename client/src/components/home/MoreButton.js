import React from "react";
import styled from "styled-components";

const MoreButton = () => {
  return (
    <Wrapper>
      <div className="one"></div>
      <div className="two"></div>
      <div className="three"></div>
      <div className="four"></div>
    </Wrapper>
  );
};

export default MoreButton;

const Wrapper = styled.div`
  display: inline;
  div {
  }
`;
