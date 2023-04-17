import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsUserLoggedIn } from "../../store/profileSlice";


import React, { useState } from "react";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
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
      navigate(`/`);

      dispatch(setIsUserLoggedIn(true))
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      {showError && <span className="error">Wrong password or username</span>}

      <Link to="/register">Don't have an account yet?</Link>

      <button type="submit">Login</button>

    </form>
  );
};

export default LoginPage;
