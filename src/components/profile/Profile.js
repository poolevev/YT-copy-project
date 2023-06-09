import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic, logout, updateUser } from "../../store/profileSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.scss";

import commentsManager from "../../models/CommentsManager";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const [nickname, setNickname] = useState(currentUser ? currentUser.nickname : "");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showCurrentPasswordError, setShowCurrentPasswordError] = useState(false);
  const [showNicknameError, setShowNicknameError] = useState(false);
  const [showNicknameSuccess, setShowNicknameSuccess] = useState(false);
  const [showPasswordChangeSuccess, setShowPasswordChangeSuccess] = useState(false);
  const [showLogOutSuccessful, setShowLogOutSuccessful] = useState(false);

  const [image, setImage] = useState(currentUser?.image || "");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profilePic = useSelector((state) => state.profile.profilePic);

  const updateAllUsers = (updatedUser) => {
    const allUsers = JSON.parse(localStorage.getItem("AllUsers") || "[]");
    const currentUserFromStorage = allUsers.find((user) => user.username === updatedUser.username);
    const filteredUsers = allUsers.filter((user) => user.username !== updatedUser.username);
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
    if (currentUser.nickname !== nickname) {
      const oldNickname = currentUser.nickname;
      currentUser.nickname = nickname;

      localStorage.setItem("LoggedUser", JSON.stringify(currentUser));
      dispatch(updateUser(currentUser));
      updateAllUsers(currentUser);
      setShowNicknameError(false);
      setShowNicknameSuccess(true);

      commentsManager.updateNickname(oldNickname, nickname);
    } else {
      setShowNicknameSuccess(false);
      setShowNicknameError(true);
    }
  };

  const updatePassword = () => {
    let valid = true;

    if (currentPassword !== currentUser.password) {
      setShowCurrentPasswordError(true);
      setShowPasswordChangeSuccess(false);
      valid = false;
    } else {
      setShowCurrentPasswordError(false);
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setShowPasswordError(true);
      setShowPasswordChangeSuccess(false);
      valid = false;
    } else {
      setShowPasswordError(false);
    }

    if (valid) {
      currentUser.password = password;

      localStorage.setItem("LoggedUser", JSON.stringify(currentUser));
      updateAllUsers(currentUser);
      setShowPasswordError(false);
      setShowCurrentPasswordError(false);
      setShowPasswordChangeSuccess(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem("LoggedUser");
    setShowLogOutSuccessful(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
    dispatch(logout());
  };

  return (
    <Container className={styles.profileContainer} style={{ marginTop: "50px" }}>
      <Row>
        <Col style={{ paddingLeft: "40px", paddingTop: "35px" }} md={3} className="d-flex flex-column align-items-center">
          {" "}
          <profileText style={{ paddingBottom: "20px" }}>Click avatar to change it:</profileText>
          <label htmlFor="hiddenFileInput" style={{ cursor: "pointer" }}>
            <div class={styles.profile_image_container}>
              <Image
                src={image || profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s"}
                alt="Profile"
                roundedCircle
                width={150}
                height={150}
                className="profilePic"
                border={"3px solid cyan"}
              />
              <profileText style={{ fontSize: "30px" }}>{currentUser?.username}</profileText>

              <Button className={styles.profileButton} style={{ display: "block", width: "auto" }} variant="primary" onClick={logOut}>
                Log out
              </Button>

              {showLogOutSuccessful && (
                <span className="logOutSuccessful" style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
                  Logging out now...
                </span>
              )}
            </div>
            <input type="file" id="hiddenFileInput" onChange={handleFileInputChange} style={{ display: "none" }} />
          </label>
        </Col>

        <Col style={{ marginTop: "35px", marginLeft: "130px" }} md={5}>
          <profileText>Write down new nickname (can't be the same):</profileText>
          <Form.Group>
            <Form.Control
              className={styles.profileForms}
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="Nickname"
              value={nickname.trim()}
              onChange={(e) => setNickname(e.target.value)}
            />

            <Button style={{ marginRight: "5px", marginBottom: "10px" }} className={styles.profileButton} variant="primary" onClick={updateNickname}>
              Update Nickname
            </Button>
            {showNicknameError && <profileText className="error">You have already this nickname</profileText>}

            {showNicknameSuccess && <profileText className="error">Nickname changed.</profileText>}
          </Form.Group>
          <profileText>Change password if needed:</profileText>

          <Form.Group>
            <Form.Control
              style={{ marginBottom: "10px" }}
              className={styles.profileForms}
              type="password"
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className={styles.profileForms}
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className={styles.profileButton} variant="primary" onClick={updatePassword}>
              Update Password
            </Button>
            <div></div>
            {showCurrentPasswordError && <profileText style={{color: "red"}} className="error">• Current Password doesn't match with your current password.</profileText>}
            <div></div>
            {showPasswordError && (
              <profileText style={{color: "red"}} className="error">
                • New Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special
                character
              </profileText>
            )}

            {showPasswordChangeSuccess && <profileText className="error">Password changed!</profileText>}
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
