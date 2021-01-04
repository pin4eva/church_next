import { getAuth } from "apollo/actions/userActions";
import jscookie from "js-cookie";
import cookies from "next-cookies";
import router from "next/router";
import PropTypes from "prop-types";
import React from "react";
export const withAuth = (WrappedComponent) => {
  const AppComponent = ({ children, ...props }) => {
    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };

  AppComponent.propTypes = {
    children: PropTypes.any,
  };

  AppComponent.getInitialProps = async (ctx) => {
    let user;
    let token = process.broswer
      ? jscookie.get("token")
      : cookies(ctx).token || "";

    if (!token) {
      if (ctx?.res) {
        ctx.res.writeHead(302, { location: "/auth" });
        ctx.res.end();
      } else {
        router.push("/auth");
      }
    } else {
      user = await getAuth(token);
    }

    const props =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return {
      props: { ...props, token, user },
    };
  };

  return AppComponent;
};
