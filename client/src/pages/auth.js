import { CheckCircle, Home } from "@material-ui/icons";
import { getAuth } from "apollo/actions/userActions";
import LoginComp from "components/LoginComp";
import SignupComp from "components/SignupComp";
import cookie from "js-cookie";
import cookies from "next-cookies";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { jscookie } from "utils/exports";

const authPage = ({ props }) => {
  const { user, token } = props;
  const [view, setView] = useState("Login");

  const handleView = (data) => {
    setView(data);
  };

  if (token && !user) cookie.remove("token");

  return (
    <Wrapper className="auth">
      <div className="aside d-none d-md-flex">
        <div className="overlay">
          <h1>WELCOME</h1>
        </div>
      </div>
      <main>
        <div className="container">
          {view !== "Confirmation" ? (
            <Fragment>
              <div className="auth-banner text-center">
                <div className="image-holder bg-primary  mx-auto">
                  <img src="placeholder.png" alt="" />
                </div>
                <p className="auth-banner_text">
                  Member <br /> {view}
                </p>
              </div>
              {!user ? (
                <div className="auth-form">
                  {view === "Login" && <LoginComp changeView={handleView} />}
                  {view === "Signup" && <SignupComp changeView={handleView} />}

                  <div className="text-center">
                    <Link href="/">
                      <a className="text-inherit">
                        <Home />
                      </a>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="auth-form">
                  <div className="text-center">
                    <h4>Welcome {user.name}</h4>
                    <Link href="/dashboard">
                      <a className="btn btn-success">Enter here</a>
                    </Link>{" "}
                    <br />
                    <p>Or</p>
                    <a
                      className="c-pointer"
                      onClick={() => jscookie.removeToken()}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </Fragment>
          ) : (
            <div>
              <div className="text-center w-75 mx-auto">
                <CheckCircle
                  className="text-success"
                  style={{ fontSize: "4rem" }}
                />
                <h4 className="my-4">
                  Thank you for registering, your account is pending
                  verification. Please check your email for further instruction{" "}
                </h4>
                <Link href="/">
                  <a className="text-inherit">
                    <Home />
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* height: 100%;
  min-height: 100vmin; */
`;
authPage.getInitialProps = async (ctx) => {
  let token = process.broswer
    ? jscookie.get("token")
    : cookies(ctx).token || "";
  let user;

  if (token) {
    user = await getAuth(token);
  }

  return {
    props: { token, user },
  };
};
export default authPage;
