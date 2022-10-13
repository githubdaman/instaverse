import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../Images/Instaverse.png";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import Avatar from "react-avatar";

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("profile"));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <Navbar bg="light" className="mt-3 mb-3 ps-3 pe-3 pt-2 pb-2  sticky-top">
        <Link to="/">
          <Navbar.Brand>INSTAVERSE</Navbar.Brand>
          <Image
            src={Logo}
            alt="logo"
            className="fluid"
            height="50"
            width="50"
          />
        </Link>
        {user ? (
          <>
            <span className="mx-auto">
              <h3>
                <Avatar round={true} size="3rem" name={user?.result?.name} />{" "}
                {user?.result?.name}
              </h3>
            </span>
            <span className="">
              <Button className="m-1 btn-danger" onClick={() => logout()}>
                Sign out
              </Button>
            </span>
          </>
        ) : (
          <>
            <span className="ms-auto">
              <Link to="/auth">
                <Button className="m-1">Sign in</Button>
              </Link>
            </span>
          </>
        )}
      </Navbar>
    </>
  );
};

export default Nav;
