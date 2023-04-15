import { useState } from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePic, changeUserName } from '../../store/profileSlice';

function Profile() {
  // State variables for the user's profile information
  // const [email, setEmail] = useState('user@example.com');
  // const [firstName, setFirstName] = useState('John');
  // const [lastName, setLastName] = useState('Doe');
  // const [dob, setDob] = useState('');
  // const [sex, setSex] = useState('male');
 
  const dispatch = useDispatch();

  // const [imageSrc, setImageSrc] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IpC2U8VG2ZIvbjGospiXbQQ76X_kjB16dOetFwjdcQ&s")
  const profilePic = useSelector(state => state.profile.profilePic);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        const base64String = reader.result;
        // dispatch informs the store for a given action
        dispatch(changeProfilePic(base64String));
    };

    reader.onerror = (error) => {
        console.error('Error converting file to base64:', error);
    };
};

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="d-flex flex-column align-items-center">

      
        <label htmlFor="hiddenFileInput" style={{ cursor: 'pointer' }}>
                        <Image
                            src={profilePic}
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
                            style={{ display: 'none' }}
                        />
                    </label>
          {/* <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group> */}
        </Col>
        <Col md={8}>
          {/* <Form.Group>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group> */}
          {/* <Form.Group>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group> */}
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
