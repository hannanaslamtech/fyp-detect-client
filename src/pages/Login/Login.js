import { Button, Container, Paper, Typography } from "@material-ui/core";
import Header from "../../components/Header/Header";
import React, { useEffect, useState} from "react";
import { Col, Form, Row } from "react-bootstrap";
import AlertComp from "../../components/Alert/Alert_Comp";
import Spinnercomp from "../../components/Spinner/Spinner_comp";
import ToastComp from "../../components/Toast/Toast_Comp";
import {useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from './Images/adminBackground.jpg';
import "./login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://detect-fyp-server.vercel.app/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        // console.log(result);
        if (result.errors) {
          setError(result.errors);
        } else {
          setToast(true);
          setError(null);
          setTimeout(() => {
            dispatch({ type: "SET__USER", payload: result.userInfo });
            localStorage.setItem("auth_token", result.token);
            localStorage.setItem("user", JSON.stringify(result.userInfo));
          }, 3000);
          clearTimeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user && user.role === "Staff") {
      history.push("/");
    } else if (user && user.role === "Admin") {
      history.push("/admin-dashboard");
    } else if (user && user.role === "Receptionist") {
      history.push("/Receptionist-dashboard");
    } else if (user && user.role === "Radiologist") {
      history.push("/Radiologist-dashboard");
    } else if (user && user.role === "Doctor") {
      history.push("/Doctor-dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  

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

      <Container>

        <ToastComp
          setToast={setToast}
          renderToast={toast}
          msg="Login Success"
        />
        <Row >
          <Col
            md={6} className="mx-auto mt-4 ">
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
						
            Login Here
					</h4>
              </Typography>
              {loading && <Spinnercomp />}
              {error && error.userExist && (
                <AlertComp variant="danger" msg={error.userExist} />
              )}

              <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                  />
                  <span style={{ color: "red" }}>{error && error.email}</span>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <span style={{ color: "red" }}>
                    {error && error.password}
                  </span>
                </Form.Group>


                <Button
                  className="mt-2"
                  style={{ backgroundColor: '#34AEDC', color: '#ffffff' }}
                  variant="contained"
                  type="submit"
                >
                  Login
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

export default Login;
