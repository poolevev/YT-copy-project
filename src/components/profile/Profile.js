import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic, logout, updateUser } from "../../store/profileSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.scss";

function Profile() {
  // State variables for the user's profile information
  const currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const [nickname, setNickname] = useState(
    currentUser ? currentUser.nickname : ""
  );
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showCurrentPasswordError, setShowCurrentPasswordError] = useState(false);
  const [showNicknameError, setShowNicknameError] = useState(false);
  const [showNicknameSuccess, setShowNicknameSuccess] = useState(false);
  const [showPasswordChangeSuccess, setShowPasswordChangeSuccess] = useState(false);

  const [image, setImage] = useState(currentUser.image || "");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

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
    if (currentUser.nickname != nickname) {
      currentUser.nickname = nickname;

      localStorage.setItem("LoggedUser", JSON.stringify(currentUser));
      dispatch(updateUser(currentUser));
      updateAllUsers(currentUser);
      setShowNicknameError(false);
      setShowNicknameSuccess(true);
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

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
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
    navigate("/");

    dispatch(logout());
  };

  return (
    <Container
      className={styles.profileContainer}
      style={{ paddingTop: "250px" }}
    >
      <Row>
        <Col
          style={{ paddingLeft: "40px" }}
          md={3}
          className="d-flex flex-column align-items-center"
        >
          {" "}
          <profileText style={{ paddingBottom: "20px" }}>
            Click avatar to change it:
          </profileText>
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
              <profileText style={{ fontSize: "30px" }}>
                {currentUser.username}
              </profileText>

              <Button
                style={{ display: "block", width: "auto" }}
                variant="primary"
                onClick={logOut}
              >
                Log out
              </Button>
            </div>

            <input
              type="file"
              id="hiddenFileInput"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
          </label>
        </Col>
        <Col md={5}>
          <profileText>
            Write down new nickname (can't be the same):
          </profileText>
          <Form.Group>
            <Form.Control
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <Button
              style={{ marginRight: "5px", marginBottom: "10px" }}
              className="btn"
              variant="primary"
              onClick={updateNickname}
            >
              Update Nickname
            </Button>
            {showNicknameError && (
              <profileText className="error">
                You have already this nickname
              </profileText>
            )}

{showNicknameSuccess && (
              <profileText className="error">
               Nickname changed.
              </profileText>
            )}

          </Form.Group>
          <profileText>Change password if needed:</profileText>

          <Form.Group>
            <Form.Control
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="btn" variant="primary" onClick={updatePassword}>
              Update Password
            </Button>
            <div></div>
            {showCurrentPasswordError && (
              <profileText className="error">
                • Current Password doesn't match with your current password.
              </profileText>
            )}
            <div></div>
            {showPasswordError && (
              <profileText className="error">
                • New Password must be at least 6 characters long and contain at
                least 1 uppercase letter, 1 lowercase letter, 1 number, and 1
                special character
              </profileText>

            )}

              {showPasswordChangeSuccess && (
              <profileText className="error">
               Password changed!
              </profileText>
            )}

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
    </Container>
  );
}

export default Profile;
