import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "apollo/queries/userQuery";
import { UserAtom } from "atoms/userAtom";
import Router from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { jscookie } from "utils/exports";
import PropTypes from "prop-types";

const LoginComp = ({ changeView }) => {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(UserAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      jscookie.set("token", data.login.token);
      alert("Welcome");
      setUser(data.login.user);
      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
      if (error?.graphQLErrors) {
        error.graphQLErrors.forEach((err) => alert(err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className=" form-check form-check-inline">
        <input type="checkbox" className="mr-3 form-check-input " />
        <label className="form-check-label">Remember Me</label>
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary font-weight-bold px-5"
          disabled={loading}
        >
          {loading ? "Processing login ..." : "Login"}
        </button>
        <a
          href="#"
          className="d-block"
          onClick={() => changeView("ForgotPassword")}
        >
          Forgot password ?
        </a>

        <p className="text-uppercase mt-4" onClick={() => changeView("Signup")}>
          <a className="c-pointer">Sign Up</a>
        </p>
      </div>
    </form>
  );
};

LoginComp.propTypes = {
  changeView: PropTypes.func,
};

export default LoginComp;
