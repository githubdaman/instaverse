import React from "react";
import { FormStyle } from "./style.js";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth.js";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    isSignup
      ? dispatch(signup(formData, navigate))
      : dispatch(signin(formData, navigate));
  };
  const switchMode = () => {
    setIsSignup((prevSignup) => !prevSignup);
  };
  return (
    <>
      <form style={FormStyle} onSubmit={handleSubmit} className="container">
        {isSignup ? (
          <Container>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>First name</label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="First name"
                name="firstName"
              />
            </div>
            <div className="mb-3">
              <label>Last name</label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastName"
              />
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                onChange={handleChange}
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                onChange={handleChange}
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
              />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                onChange={handleChange}
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="confirmPassword"
              />
            </div>

            <div className="d-grid">
              <Button className="m-1" type="submit">
                Sign Up
              </Button>
            </div>
          </Container>
        ) : (
          <Container>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                onChange={handleChange}
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                onChange={handleChange}
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
              />
            </div>
            <div className="d-grid">
              <Button type="submit" className="m-1">
                Submit
              </Button>
            </div>
          </Container>
        )}
        <Button variant="link" onClick={switchMode}>
          {isSignup
            ? "Already have and account?Sign in"
            : "Don't have an account?Sign up"}{" "}
        </Button>
      </form>
    </>
  );
};

export default Auth;
