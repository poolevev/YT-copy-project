import React, { useState } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.scss";


const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPasswordConfirmError, setShowPasswordConfirmError] = useState(false);
  const [showRegisterSuccessful, setShowRegisterSuccessful] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    // Validate username
    if (!username.trim()) {
      setShowUsernameError(true);
      valid = false;
    }

    // Validate password
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setShowPasswordError(true);
      valid = false;
    }

    // Validate password confirmation
    if (password !== passwordConfirm) {
      setShowPasswordConfirmError(true);
      valid = false;
    }

    if (valid) {
      const newUser = {
        username,
        nickname: username,
        password,
      };

      // Retrieve existing users from local storage, or start with an empty array
      const existingUsers = JSON.parse(
        localStorage.getItem("AllUsers") || "[]"
      );

      // Add the new user to the array of existing users
      const allUsers = [...existingUsers, newUser];

      // Save the updated array of users to local storage
      localStorage.setItem("AllUsers", JSON.stringify(allUsers));

      // Clear the form
      setUsername("");
      setPassword("");
      setPasswordConfirm("");
      setShowRegisterSuccessful (true)
      setTimeout(() => {
      navigate(`/login`);
    }, 2000);
    }
  };

  return (
    <Container className={styles.profileContainer}
    style={{ marginTop: "50px"}}>
      <Row>
        <Col   style={{ marginTop: "60px", marginLeft: "500px" }}
          md={3}
          className="d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
               style={{ marginLeft: "5px" }}
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="form-control"
              />
            
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control"
              />
             
            </div>
            <div>
              <label htmlFor="password-confirm">Confirm Password:</label>
              <input
                type="password"
                id="password-confirm"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                className="form-control"
              />
              
            </div>

            <Link style={{color:"rgb(93, 147, 177)" }} to="/login">Already have an account?</Link>

            <Button style={{ margin: "5px" }} type="submit">Register</Button>

            <div style={{color:"rgb(93, 147, 177)", position: "absolute"}}>
              <div>
              {showUsernameError && (
                  <div className="error"> • Please enter a username</div>
                )}
              {showPasswordError && (
                  <div className="error">
                     • Password must be at least 6 characters long and 
                     <br/> contain at least 1 uppercase letter, 1 lowercase letter, 1 number,<br/> and 1 special character
                  </div>
                )}
              {showPasswordConfirmError && (
                  <div className="error"> • Passwords do not match</div>
                )}
              </div>
              {showRegisterSuccessful && (
                  <div className="error">Registration Successful!
                  </div> )}
            </div>


          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
