import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/profileSlice";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from "./LoginPage.module.scss";


import sample from "../../img/back.mp4"

import React, {useEffect, useState } from "react";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoginSuccessful, setShowLoginSuccessful] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
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

  useEffect(() => {
    const videoElement = document.getElementById("background-video");

    if (videoElement) {
      videoElement.addEventListener("loadeddata", () => {
        setVideoLoaded(true);
      });
    }
  }, []);
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
    <Container className={`${styles.profileContainer} video-background`} style={{ marginTop: "50px" }}>
      <video id="background-video" className={styles.videoLogin} src={sample} loop autoPlay></video>

      {videoLoaded && (

      <Row>
      <Col style={{ marginTop: "350px", marginLeft: "580px" }} md={3} className="d-flex flex-column align-items-center">          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ fontSize: '20px', fontWeight: 'bold' }} htmlFor="username">
                Username:
              </label>
              <input style={{ margin: "0px 0px 10px 5px", width: '207px' }} type="text" id="username" value={username} onChange={handleUsernameChange} />
            </div>
            <div>
              <label style={{ fontSize: '20px', fontWeight: 'bold' }} htmlFor="password">
                Password:
              </label>
              <input style={{ marginLeft: "10px", width: '207px'}} type="password" id="password" value={password} onChange={handlePasswordChange} />
            </div>
           
            <Link style={{ fontSize: '20px', marginTop: "500px" , color: "blue"}} to="/register">
              Don't have an account yet?
            </Link>
            <Button style={{ marginTop:"10px", marginLeft:"5px" }} className={styles.profileButton} type="submit">
              Login
            </Button>
            <div style={{ display: "flex", position: "absolute" }}>
              {showError && (
                <span style={{ color: "rgb(240, 7, 34)" }} className="error">
                  • Wrong password or username
                </span>
              )}
              {showLoginSuccessful && (
                <span style={{ color: "green", fontSize: '20px', fontWeight: 'bold' }} className="loginSuccessful">
                  You are logged in!
                </span>
              )}
            </div>
          </form>
        </Col>
      </Row>
      )}
    </Container>
  );
};

export default LoginPage;
