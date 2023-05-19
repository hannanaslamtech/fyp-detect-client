import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AlertComp from "../../components/Alert/Alert_Comp";
import SpinnerComp from "../../components/Spinner/Spinner_comp";
import ToastComp from "../../components/Toast/Toast_Comp";
import { useHistory } from "react-router-dom";
import backgroundImage from '../Admin/AdminDashboard/adminBackground.jpg';


const EditPatient = () => {
  const [patientName, setpatientName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [contactInfo, setcontactInfo] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();
  const User=history.location.state.user;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://detect-fyp-server.vercel.app/patient/editpatient", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id:User._id,
        patientName,
        age,
        gender,
        contactInfo, 
      }), 
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.errors) {
          setError(result.errors);
        } else {
          setToast(true);
          setError(null);
          setTimeout(() => {
             history.push("/Receptionist-dashboard");
          }, 3000);
          clearTimeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    
    User?setpatientName(User.patientName):setpatientName("");
    User?setage(User.age):setage("");
    User?setgender(User.gender):setgender("");
    User?setcontactInfo(User.contactInfo):setcontactInfo("")
  }, [User])

  return (
    <div style={{
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      height: 'auto',
      width: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: `url(${backgroundImage})`,
      }}
      >
      <Container>
        <ToastComp
          setToast={setToast}
          renderToast={toast}
          msg="edit successfull "
        />
        <Row>
          <Col md={6} className="mx-auto mt-4 ">
            <Paper 
              style={{ background: 'linear-gradient(to right, #dfe4e7, #909497)'}}
              className="p-4 shadow rounded"
            >
              <Typography
                className="text-center text-primary mb-3"
                variant="h5"
              >
                <h4 style={{
						color:'#072A37',
						fontWeight: 'bold',
						fontSize: '20px',
						textDecoration: 'underline',
						letterSpacing: '2px',
						textTransform: 'uppercase',
						fontFamily: 'Arial, sans-serif',
						textAlign: 'center'
					}}>
						   Edit Patient info
					</h4>
              </Typography>
              {loading && <SpinnerComp />}
              {error && error.user && (
                <AlertComp variant="danger" msg={error.user} />
              )}

              <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId="text">
                  <Form.Label>Patient name</Form.Label>
                  <Form.Control
                    onChange={(e) => setpatientName(e.target.value)}
                    type="text"
                    placeholder="Enter name"
                    value={patientName}
                  />
                  <span style={{ color: "red" }}>
                    {error && error.patientName}
                  </span>
                </Form.Group>
                <Form.Group controlId="text">
                  <Form.Label>Patient age</Form.Label>
                  <Form.Control
                    onChange={(e) => setage(e.target.value)}
                    type="text"
                    placeholder="Enter age"
                    value={age}
                  />
                  <span style={{ color: "red" }}>{error && error.age}</span>
                </Form.Group>
                
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Gender</Form.Label>
                  <select class="input_submit" id="gender" name="gender"
                  onChange={(e)=>{
                    setgender(e.target.value)
                  }}
                  value={gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <span style={{ color: "red" }}>
                    {error && error.roleSelect}
                  </span>

                </Form.Group>
                <Form.Group controlId="text">
                  <Form.Label>Patient contact number</Form.Label>
                  <Form.Control
                    onChange={(e) => setcontactInfo(e.target.value)}
                    type="text"
                    placeholder="Enter contact info"
                  />
                     <span style={{ color: "red" }}>
                    {error && error.contactInfo}
                  </span>
                  </Form.Group>

                  
                
                <Button
                  className="mt-2"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditPatient;
