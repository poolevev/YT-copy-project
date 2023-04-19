import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic, logout, updateUser } from "../../store/profileSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.scss"

function Profile() {
  // State variables for the user's profile information
  const currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const [nickname, setNickname] = useState(
    currentUser ? currentUser.nickname : ""
  );
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showCurrentPasswordError, setShowCurrentPasswordError] =
    useState(false);

  const [image, setImage] = useState(currentUser.image || "");
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');


  // const [lastName, setLastName] = useState('Doe');
  // const [dob, setDob] = useState('');
  // const [sex, setSex] = useState('male');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [imageSrc, setImageSrc] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s")
  const profilePic = useSelector((state) => state.profile.profilePic);

  const updateAllUsers = (updatedUser) => {
    const allUsers = JSON.parse(localStorage.getItem("AllUsers") || "[]");
    const currentUserFromStorage = allUsers.find(
      (user) => user.username === updatedUser.username
    );
    const filteredUsers = allUsers.filter(
      (user) => user.username !== updatedUser.username
    );
    const newUser = {
      ...currentUserFromStorage,
      ...updatedUser,
    };
    const newUsers = [...filteredUsers, newUser];

    localStorage.setItem("AllUsers", JSON.stringify(newUsers));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result;
      setImage(base64String);
      dispatch(changeProfilePic(base64String));

      // Update currentUser object and localStorage with the base64 string
      const updatedUser = {
        ...currentUser,
        image: base64String,
      };
      localStorage.setItem("LoggedUser", JSON.stringify(updatedUser));
      updateAllUsers(updatedUser);
    };

    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  const updateNickname = () => {
    currentUser.nickname = nickname;

    localStorage.setItem("LoggedUser", JSON.stringify(currentUser));
    dispatch(updateUser(currentUser));
    updateAllUsers(currentUser);
  };

  const updatePassword = () => {
    let valid = true;

    if (currentPassword !== currentUser.password) {
      setShowCurrentPasswordError(true);
      valid = false;
    }else {
      setShowCurrentPasswordError(false);
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setShowPasswordError(true);
      valid = false;
    } else {
      setShowPasswordError(false);
    }

    if (valid) {
      currentUser.password = password;

      localStorage.setItem("LoggedUser", JSON.stringify(currentUser));
      updateAllUsers(currentUser);
    }
  };

  const logOut = () => {
    localStorage.removeItem("LoggedUser");
    navigate("/");

    dispatch(logout());
  };

  return (
    <Container className="my-5">
      <Row>
        <h2>Click avatar to change it:</h2>
        <Col
          style={{ paddingLeft: "40px" }}
          md={4}
          className="d-flex flex-column align-items-center"
        >
          <label htmlFor="hiddenFileInput" style={{ cursor: "pointer" }}>
            <Image
              src={image || profilePic}
              alt="Profile"
              roundedCircle
              width={150}
              height={150}
              className="profilePic"
            />
            <h3 style={{ paddingLeft: "40px" }}>{currentUser.username}</h3>

            <input
              type="file"
              id="hiddenFileInput"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
          </label>
        </Col>
        <Col md={8}>
          <Form.Group>
            <Form.Control
              style={{ marginLeft: "20px" }}
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Button className="btn" variant="primary" onClick={updateNickname}>
              Update Nickname
            </Button>
          </Form.Group>

          <Form.Group>
            <Form.Control
              style={{ marginLeft: "20px", marginBottom: "10px" }}
              type="password"
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {showCurrentPasswordError && (
              <span className="error">Password doesn't match</span>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Control
              style={{ marginLeft: "20px", marginBottom: "10px" }}
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPasswordError && (
              <span className="error">
                Password must be at least 6 characters long and contain at least
                1 uppercase letter, 1 lowercase letter, 1 number, and 1 special
                character
              </span>
            )}

            <Button className="btn" variant="primary" onClick={updatePassword}>
              Update Password
            </Button>
          </Form.Group>

          {/* <Form.Group>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group> */}
          {/* <Form.Group>
            <Form.Control
              as="select"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group> */}
        </Col>
      </Row>

      <Button variant="primary" onClick={logOut}>
        Log Out
      </Button>
    </Container>
  );
}

export default Profile;
