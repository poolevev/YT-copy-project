import { useState } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic, changeUserName } from "../../store/profileSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Profile() {
  // State variables for the user's profile information
  const currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const [nickname, setNickname] = useState(
    currentUser ? currentUser.nickname : ""
  );

  const [image, setImage] = useState(currentUser.image);
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
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

            <input
              type="file"
              id="hiddenFileInput"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
          </label>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
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
        onClick={(e) => {
          const allUsers = JSON.parse(localStorage.getItem("AllUsers") || "[]");






          currentUser.image = image;
          currentUser.nickname = nickname;
          currentUser.username = userName;

          localStorage.setItem("LoggedUser", JSON.stringify(currentUser));
        
        
          allUsers.map((el) => {
            if (el.username === currentUser.username) {
              el = currentUser;
              // el.image = image;
              // el.nickname = nickname;
            }
          });

          localStorage.setItem("AllUsers", JSON.stringify(allUsers));
          console.log(allUsers);
        }}
      >
        Update Profile {"."}

      </Button>{" "}

      <Button variant="primary" onClick={(e) => { 
  localStorage.removeItem("LoggedUser"); 
  navigate("/");
}}>
  Log Out
</Button>

    
    
    </Container>
  );
}

export default Profile;
