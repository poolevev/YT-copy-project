import React, { useState } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPasswordConfirmError, setShowPasswordConfirmError] =
    useState(false);
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

      navigate(`/login`);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="form-control"
              />
              {showUsernameError && (
                <span className="error">Please enter a username</span>
              )}
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
              {showPasswordError && (
                <span className="error">
                  Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
                </span>
              )}
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
              {showPasswordConfirmError && (
                <span className="error">Passwords do not match</span>
              )}
            </div>

            <Link to="/login">Already have an account?</Link>

            <Button type="submit">Register</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
