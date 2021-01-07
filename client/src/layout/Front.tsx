import React, { Fragment } from "react";
import FrontHeader from "../components/FrontHeader";
import PropTypes from "prop-types";
import Head from "next/head";
import styled from "styled-components";
import FrontFooter from "../components/FrontFooter";

const Front = ({ children }) => {
  return (
    <Fragment>
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
        /> */}
        <title>JHAI</title>
      </Head>
      <Wrapper id="front_layout">
        <header>
          <FrontHeader />
        </header>
        <main>{children}</main>
        <FrontFooter />
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.section`
  /* height: 100%; */
`;

Front.propTypes = {
  children: PropTypes.node,
};
export default Front;
