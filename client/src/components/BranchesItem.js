import { PinDrop } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const BranchesItem = ({ branch }) => {
  return (
    <Wrapper>
      <div className="wra">
        <p className="branch-name text-primary">{branch.name}</p>
        <div className="branch-address">
          <PinDrop className="text-secondary mr-3" />
          <div className="address-text">{branch.address}</div>
        </div>
        <div
          className="branches_image-wrapper"
          style={{
            background: `url(${branch.pastor?.image}) no-repeat`,
          }}
        >
          <div className="branch-shape ">
            <div className="text-center">
              <h3>{branch.pastor?.name} </h3>
              <div className="line "></div>
              <p className="desc">Branch Pastor</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: Montserrat;
  font-style: normal;
  width: 100%;
  /* max-width: 20rem; */
  .branch-name {
    font-size: 2rem;
    line-height: 3.75rem;
    font-weight: bold;
    text-align: center;
  }
  .branch-address {
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 31px;
    /* margin-bottom: 1.375rem; */
  }
  .branches_image-wrapper {
    position: relative;
    background-size: contain !important;
    background-position: center !important;
    height: 44.93rem;
    width: 100%;
    /* object-fit: cover; */

    .branch-shape {
      position: absolute;
      bottom: 0;
      font-weight: bold;
      font-size: 40px;
      line-height: 43px;
      padding: 0 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background: url("rec-2.png") no-repeat;
      background-size: cover;
      background-position: center;
      width: 100%;

      height: 17.875rem;

      /* -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 100%, 0 100%, 0 25%);
      clip-path: polygon(50% 0, 100% 25%, 100% 100%, 0 100%, 0 25%); */
      .line {
        height: 1px;
        background-color: lightgray;
        width: 100%;
        max-width: 60%;
        margin: 1rem auto;
      }
    }
  }
`;

BranchesItem.propTypes = {
  branch: PropTypes.object,
};

export default BranchesItem;
