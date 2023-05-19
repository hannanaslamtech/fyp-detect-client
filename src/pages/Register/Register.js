import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AlertComp from "../../components/Alert/Alert_Comp";
import Spinnercomp from "../../components/Spinner/Spinner_comp";
import ToastComp from "../../components/Toast/Toast_Comp";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Admin/AdminDashboard/Header/Header";
import backgroundImage from '../Admin/AdminDashboard/adminBackground.jpg';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();

  const {user} = useSelector((state) => state.auth);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://detect-fyp-server.vercel.app/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        confirmPassword,
        role:"Staff",
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
            history.push("/login");
          }, 3000);
          clearTimeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if(user && user.role==="Staff"   )
    {
      history.push('/')
    }
    
  }, [user, history])

  return (
    <>
    <Header />
    <div style={{
    justifyContent: 'center',
    alignItems: 'center',
    height: '87.8vh',
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
          msg="Registration Success "
        />
        <Row>
          <Col md={6} className="mx-auto mt-4 ">
            <Paper 
            style={{ background: 'linear-gradient(to right, #dfe4e7, #909497)'}}
            className="p-4 shadow rounded">
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
						Register Here
					</h4>
              </Typography>
              {loading && <Spinnercomp />}
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
                  />
                  <span style={{ color: "red" }}>{error && error.email}</span>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
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

export default Register;
