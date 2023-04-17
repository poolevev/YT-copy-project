import { useState } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic, setIsUserLoggedIn } from "../../store/profileSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Profile() {
  // State variables for the user's profile information
  const currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const [nickname, setNickname] = useState(
    currentUser ? currentUser.nickname : ""
  );

  const [image, setImage] = useState(currentUser.image || '');
  const [password, setPassword] = useState();
 
  // const [lastName, setLastName] = useState('Doe');
  // const [dob, setDob] = useState('');
  // const [sex, setSex] = useState('male');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [imageSrc, setImageSrc] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s")
  const profilePic = useSelector((state) => state.profile.profilePic);

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
    };
  
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  const updateProfile = () => {
    currentUser.image = image;
    currentUser.nickname = nickname;
    currentUser.password = password;
    
    localStorage.setItem("LoggedUser", JSON.stringify(currentUser));


    const allUsers = JSON.parse(localStorage.getItem("AllUsers") || "[]");
    const currentUserFromStorage = allUsers.find((user) => user.username === currentUser.username);
    const filteredUsers = allUsers.filter(user => user.username !== currentUser.username)
    const newUser = {
      ...currentUserFromStorage,
      ...currentUser
    }
    const newUsers = [...filteredUsers, newUser]

    localStorage.setItem("AllUsers", JSON.stringify(newUsers));
  }
  
  const logOut = () => {
    localStorage.removeItem("LoggedUser"); 
    navigate("/");
  
    dispatch(setIsUserLoggedIn(false))
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="d-flex flex-column align-items-center">
          <label htmlFor="hiddenFileInput" style={{ cursor: "pointer" }}>
          <Image
  src={image || profilePic}
  alt="Profile"
  roundedCircle
  width={150}
  height={150}
  className="profilePic"
/>    
<h3>{currentUser.username}</h3>

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
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
      <Button className="btn"
        variant="primary"
        onClick={updateProfile}
      >
        Update Profile 

      </Button>

      <Button variant="primary" onClick={logOut}>
  Log Out
</Button>

    
    
    </Container>
  );
}

export default Profile;
