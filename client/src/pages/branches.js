import BranchesItem from "components/BranchesItem";
import FrontFooter from "components/FrontFooter";
import FrontHeader from "components/FrontHeader";
import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import styled from "styled-components";
import { Grid } from "theme-ui";
import { branches } from "utils/exports";

const BranchesPage = () => {
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="HQ 23 Ordu Avenue, Eliowhani Port Harcourt"
        />
        <title>Branches</title>
      </Head>
      <Wrapper>
        <header>
          <div className="nav-overlay">
            <FrontHeader />
          </div>
          <div className="banner container">
            <div className="text-center">
              <h1 className="banner-text">Branches</h1>
            </div>
          </div>
        </header>
        <div className="branches-main main container mb-4">
          <Grid columns={[1, 2, 3]}>
            {branches.map((branche, i) => (
              <BranchesItem key={i} branch={branche} />
            ))}
          </Grid>
        </div>
        <FrontFooter />
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.div`
  header {
    background: url("branches-bg.png") no-repeat;
    height: 426px;
    background-size: cover;
    .nav-overlay {
      background-color: rgba(13, 26, 36, 0.37);
    }
    .text-content,
    .nav-link {
      color: white;
    }
  }
`;
export default BranchesPage;
