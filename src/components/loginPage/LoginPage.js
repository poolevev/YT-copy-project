import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/profileSlice";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from "./LoginPage.module.scss";

import React, { useState } from "react";
import { FileX } from "react-bootstrap-icons";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoginSuccessful, setShowLoginSuccessful] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim());
    setShowError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setShowError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Retrieve existing users from local storage
    const allUsers = JSON.parse(localStorage.getItem("AllUsers") || "[]");
  
    // Find the user with the given username
    const user = allUsers.find((u) => u.username === username);
  
    if (!user || user.password !== password) {
      setShowError(true);
    } else {
      // Save the logged-in user to local storage
      localStorage.setItem("LoggedUser", JSON.stringify(user));
  
      setUsername("");
      setPassword("");
      dispatch(updateUser(user));
      setShowLoginSuccessful(true);
  
      // Wait for 2 seconds before navigating to the home page
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
  };
  

  return (
    <Container
      className={styles.profileContainer}
      style={{ marginTop: "50px"}}
    >
      <Row>
        <Col
          style={{ marginTop: "35px", marginLeft: "500px" }}
          md={3}
          className="d-flex flex-column align-items-center"
        >
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{color:"rgb(3, 140, 252)"}} htmlFor="username">Username:</label>
              <input
                style={{ marginLeft: "5px" }}
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label style={{color:"rgb(3, 140, 252)"}} htmlFor="password">Password:</label>
              <input
                style={{ marginLeft: "10px" }}
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
           
            <Link style={{color:"rgb(93, 147, 177)" }} to="/register">Don't have an account yet?</Link>
            <Button style={{ margin: "5px"}} className={styles.profileButton} type="submit">
              Login
            </Button>
            <div style={{display: "flex", position: "absolute"}}>
            {showError && (
              <span  style={{color:"rgb(240, 7, 34)" }} className="error">•  Wrong password or username</span>
            )}
             {showLoginSuccessful && (
              <span  style={{color:"rgb(79, 194, 102)" }} className="loginSuccessful">You are logged in!</span>
            )}
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
