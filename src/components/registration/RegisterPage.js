
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.scss";

import sample2 from "../../img/back2.mp4"

import React, {useEffect, useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPasswordConfirmError, setShowPasswordConfirmError] = useState(false);
  const [showRegisterSuccessful, setShowRegisterSuccessful] = useState(false);
  const [showUserAlreadyExistError, setShowUserAlreadyExistError] = useState(false);
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim());
    setShowUsernameError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setShowPasswordError(false);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
    setShowPasswordConfirmError(false);
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
    let valid = true;

    

    if (!username.trim()) {
      setShowUsernameError(true);
      valid = false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setShowPasswordError(true);
      valid = false;
    }

    if (password !== passwordConfirm) {
      setShowPasswordConfirmError(true);
      valid = false;
    }

    if (valid) {
      const existingUsers = JSON.parse(localStorage.getItem("AllUsers") || "[]");

      const userExists = existingUsers.some((user) => user.username === username);

      if (userExists) {
        setShowUserAlreadyExistError(true);
        return;
      }

      const newUser = {
        username,
        nickname: username,
        password,
      };

      const allUsers = [...existingUsers, newUser];

      localStorage.setItem("AllUsers", JSON.stringify(allUsers));

      setUsername("");
      setPassword("");
      setPasswordConfirm("");
      setShowRegisterSuccessful(true);
      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    }
  };

  return (
    <Container className={styles.profileContainer} style={{ marginTop: "50px" }}>
       <video id="background-video" className={styles.videoLogin} src={sample2} loop autoPlay></video>
       {videoLoaded && (
      <Row>
        <Col style={{ marginTop: "300px", marginLeft: "580px" }} md={3} className="d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ fontSize: '20px', fontWeight: 'bold' }} htmlFor="username">
                Username:
              </label>
              <input
       
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="form-control"
              />
            </div>
            <div>
              <label  style={{ fontSize: '20px', fontWeight: 'bold' }} htmlFor="password">
                Password:
              </label>
              <input type="password" id="password" value={password} onChange={handlePasswordChange} className="form-control" />
            </div>
            <div>
              <label  style={{ fontSize: '20px', fontWeight: 'bold' }} htmlFor="password-confirm">
                Confirm Password:
              </label>
              <input style={{width: '350px'}} type="password" id="password-confirm" value={passwordConfirm} onChange={handlePasswordConfirmChange} className="form-control" />
            </div>

            <Link style={{ fontSize: '20px', marginTop: "500px" , color: "blue"}} to="/login">
              Already have an account?
            </Link>

            <Button style={{ margin: "5px 0px 0px 40px", background: "rgb(63, 63, 68)" }} type="submit">
              Register
            </Button>

            <div style={{ color: "rgb(240, 7, 34)", position: "absolute" }}>
              <div>
                {showUsernameError && <div className="error"> • Please enter a username</div>}
                {showPasswordError && (
                  <div className="error">
                    • Password must be at least 6 characters long and
                    <br /> contain at least 1 uppercase letter, 1 lowercase letter, 1 number,
                    <br /> and 1 special character
                  </div>
                )}
                {showPasswordConfirmError && <div className="error"> • Passwords do not match</div>}
              </div>
              {showRegisterSuccessful && (
                <div style={{ color: "green", fontSize: '20px', fontWeight: 'bold' }}  className="error">
                  Registration Successful!
                </div>
              )}
              {showUserAlreadyExistError && <div className="error">• This username is already taken!</div>}
            </div>
          </form>
        </Col>
      </Row>
      )}
    </Container>
  );
};

export default RegisterPage;
