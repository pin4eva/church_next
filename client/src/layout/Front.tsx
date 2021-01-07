import React, { Fragment } from "react";
import FrontHeader from "../components/FrontHeader";
import PropTypes from "prop-types";
import Head from "next/head";
import styled from "styled-components";
import FrontFooter from "../components/FrontFooter";

const Front = (props: { children: React.ReactNode }): JSX.Element => {
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="Connecting you to your divine heritage in Christ"
        />
        <title>Joint Heirs Assembly International</title>
      </Head>
      <Wrapper id="front_layout">
        <header>
          <FrontHeader />
        </header>
        <main>{props.children}</main>
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
