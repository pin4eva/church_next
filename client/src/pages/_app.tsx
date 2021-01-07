import { ApolloProvider, useQuery } from "@apollo/client";
import { useApollo } from "apollo";
import { GET_SERMONS } from "apollo/queries/sermonQuery";
import { SermonAtom } from "atoms/sermonAtom";
import Head from "next/head";
import Router from "next/router";
import Nprogress from "nprogress";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { ThemeProvider as StyledProvider } from "styled-components";
import "styles/index.scss";
import "styles/style.css";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";

if (typeof window !== "undefined") {
  require("popper.js");

  require("bootstrap/dist/js/bootstrap");
}

Router.events.on("routeChangeStart", () => {
  Nprogress.start();
});
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

// interface PageProps {
//   apollo: ApolloClient<any>;
// }

const MyApp = ({ Component, pageProps }): JSX.Element => {
  const apolloClient = useApollo(pageProps.apollo);
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="Offical website of Joint Heirs Assembly International"
        />
        <meta name="yandex-verification" content="fc47c63745224a52" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/nprogress.css" />

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
          integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="
          crossOrigin="anonymous"
        ></script>
      </Head>
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <StyledProvider theme={theme}>
              {/* <GlobalStyles /> */}
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </StyledProvider>
          </ThemeProvider>
        </RecoilRoot>
      </ApolloProvider>
    </Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;

export const PageLayout = ({ children }) => {
  const { data: sermonData } = useQuery(GET_SERMONS);
  const setSermons = useSetRecoilState(SermonAtom);

  // const [user, setUser] = useRecoilState(UserAtom);

  // useEffect(() => {
  //   const getAuthFunc = async () => {
  //     const data = await getAuth();
  //     console.log(data);
  //   };
  //   getAuthFunc();
  // }, []);
  useEffect(() => {
    if (sermonData?.getSermons) {
      setSermons(sermonData.getSermons);
    }
  }, [sermonData]);

  return <Fragment>{children}</Fragment>;
};

PageLayout.propTypes = {
  children: PropTypes.any,
};
