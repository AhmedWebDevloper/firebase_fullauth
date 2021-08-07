import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../components/firebase";
import { useHistory } from "react-router-dom";

const Header = (props) => {

  const history = useHistory();

  return (
    <>
      <header className="d-flex justify-content-between bg-danger p-2">
        <h3 className="h-100">Todo App</h3>
        {props.user ? (
          <>
            <Link>
              <button
                className="btn btn-primary mx-2 "
                onClick={() => {
                  auth.signOut();
                  history.push("/login");
                }}
              >
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="">
              <Link to="/login">
                <button className="btn btn-primary mx-2">Log In</button>
              </Link>{" "}
              <Link to="/signup">
                <button className="btn btn-primary mx-2">Sign Up</button>
              </Link>
            </div>
          </>
        )}
      </header>
      <br />
      <h1>ToDo List</h1>
      <br />
    </>
  );
};
export default Header;
