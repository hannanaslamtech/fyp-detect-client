import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AlertComp from "../../components/Alert/Alert_Comp";
import SpinnerComp from "../../components/Spinner/Spinner_comp";
import ToastComp from "../../components/Toast/Toast_Comp";
import { useHistory } from "react-router-dom";
import backgroundImage from '../Admin/AdminDashboard/adminBackground.jpg';

const EditStaff = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setConfirmPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();
  const User = history.location.state.user;


  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://detect-fyp-server.vercel.app/users/editStaff", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: User._id,
        userName,
        email,
        password,
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
            history.push("https://detect-fyp-server.vercel.app/Receptionist-dashboard");
          }, 3000);
          clearTimeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {

    User ? setUserName(User.userName) : setUserName("");
    User ? setEmail(User.email) : setEmail("");
    User ? setPassword(User.password) : setPassword("")
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
              style={{ background: 'linear-gradient(to right, #dfe4e7, #909497)' }}
              className="p-4 shadow rounded"
            >
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
                  Edit User
                </h4>

              </Typography>
              {loading && <SpinnerComp />}
              {error && error.user && (
                <AlertComp variant="danger" msg={error.user} />
              )}

              <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="Enter Your Username"
                    value={userName}
                  />
                  <span style={{ color: "red" }}>
                    {error && error.userName}
                  </span>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                    value={email}
                  />
                  <span style={{ color: "red" }}>{error && error.email}</span>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    value={password}
                  />
                  <span style={{ color: "red" }}>
                    {error && error.password}
                  </span>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <span style={{ color: "red" }}>
                    {error && error.confirmPassword}
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

export default EditStaff;
