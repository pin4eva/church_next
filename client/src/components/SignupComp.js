import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "apollo/queries/userQuery";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Grid } from "theme-ui";
import { branches } from "utils/exports";

const SignupComp = ({ changeView }) => {
  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);
  const [info, setInfo] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
    branch: "",
    fellowship: "",
    department: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password2, ...rest } = info;

    if (info.password !== info.password2) return alert("Passwords don't match");
    try {
      const { data } = await signup({ variables: { input: rest } });
      alert("Success !");
      changeView("Confirmation");
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error?.graphQLErrors) {
        error.graphQLErrors.forEach((err) => alert(err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid columns={[1, null, 2]}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={info.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={info.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </Grid>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={info.password}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Repeat password</label>
        <input
          type="password"
          name="password2"
          value={info.password2}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Branch</label>
        <select
          name="branch"
          value={info.branch}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Select a branch</option>
          <option>Mother Branch</option>
          {branches.map((branch, i) => (
            <option key={i}>{branch.name}</option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary font-weight-bold px-5"
          disabled={loading}
        >
          {loading ? "Processing..." : "Register me"}
        </button>

        <p className="text-uppercase mt-4" onClick={() => changeView("Login")}>
          <a className="c-pointer">Login</a>
        </p>
      </div>
    </form>
  );
};

SignupComp.propTypes = {
  changeView: PropTypes.func,
};

export default SignupComp;
