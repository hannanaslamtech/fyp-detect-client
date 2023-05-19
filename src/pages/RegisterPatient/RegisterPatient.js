import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AlertComp from "../../components/Alert/Alert_Comp";
import Spinnercomp from "../../components/Spinner/Spinner_comp";
import ToastComp from "../../components/Toast/Toast_Comp";
import {useHistory } from "react-router-dom";
import Header from "../Receptionist/Header/Header";
import backgroundImage from '../Receptionist/adminBackground.jpg';

const Registerpatient = () => {
  const [patientName, setpatientName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [contactInfo, setcontactInfo] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    if (!patientName) {
      errors.patientName = "Please enter patient name";
    }
    if (!age) {
      errors.age = "Please enter age";
    } else if (isNaN(age)) {
      errors.age = "Age must be a number";
    }
    if (!contactInfo) {
      errors.contactInfo = "Please enter contact number";
    } else if (contactInfo.length !== 11 || isNaN(contactInfo)) {
      errors.contactInfo = "Contact number must be 11 digits";
    }

    if (!gender) {
      errors.gender = "Please select a Gender";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setLoading(true);
    fetch("https://detect-fyp-server.vercel.app/patient/registerPatient", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          setError({});
          setTimeout(() => {
            history.push("https://detect-fyp-server.vercel.app/login");
          }, 3000);
          clearTimeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Header />
      <div style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        minHeight: '88vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${backgroundImage})`,
      }}
      >
        <Container fluid style={{ paddingTop: "5px" }}>
          <ToastComp
            setToast={setToast}
            renderToast={toast}
            msg="Registration Success "
          />
          <Row>
            <Col md={6} className="mx-auto mt-4 ">
              <Paper
                style={{ background: 'linear-gradient(to right, #dfe4e7, #909497)' }}
                className="p-4 shadow rounded">
                <Typography
                  className="text-center text-primary mb-3"
                  variant="h5"
                >
                  <h4 style={{
                    color: '#072A37',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textDecoration: 'underline',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center'
                  }}>
                    Add Patient Here
                  </h4>
                </Typography>
                {loading && <Spinnercomp />}
                {error && error.user && (
                  <AlertComp variant="danger" msg={error.user} />
                )}

                <Form onSubmit={formSubmitHandler}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Patient name</Form.Label>
                    <Form.Control
                      onChange={(e) => setpatientName(e.target.value)}
                      type="text"
                      placeholder="Enter Patient Name"
                    />
                    {error && error.patientName && (
                      <AlertComp variant="danger" msg={error.patientName} />
                    )}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      onChange={(e) => setage(e.target.value)}
                      type="text"
                      placeholder="Enter age"
                    />
                    {error && error.age && (
                      <AlertComp variant="danger" msg={error.age} />
                    )}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Gender</Form.Label>
                    <select class="input_submit" id="gender" name="gender"
                      onChange={(e) => {
                        setgender(e.target.value)
                        setError((prevError) => ({ ...prevError, gender: null }));
                      }}
                      value={gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {error && error.gender && (
                      <AlertComp variant="danger" msg={error.gender} />
                    )}
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contact number</Form.Label>
                    <Form.Control
                      onChange={(e) => setcontactInfo(e.target.value)}
                      type="text"
                      placeholder="Contact number"
                    />
                    {error && error.contactInfo && (
                      <AlertComp variant="danger" msg={error.contactInfo} />
                    )}
                  </Form.Group>
                  <Button
                    className="mt-2"
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: '#34AEDC', color: '#ffffff' }}
                  >
                    Submit
                  </Button>
                </Form>
              </Paper>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Registerpatient;
