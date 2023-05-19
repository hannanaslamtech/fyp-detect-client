import React from 'react';
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import Header from "./Header/Header";
import backgroundImage from './adminBackground.jpg';
import Axios from 'axios';
import { useEffect, useState } from 'react';



import { useSelector } from "react-redux";

const ReceptionistDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const response = await Axios.get('https://detect-fyp-server.vercel.app/users/getAppointment');
    setAppointments(response.data.AppointmentInfo);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const currentDate = new Date().toLocaleDateString();

  const todaysAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date_Time).toLocaleDateString();
    return appointmentDate === currentDate;
  });

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
          <Row>
            <Col md={1} sm={12} className={`d-none d-md-block`}>
            </Col>
            <Col md={10}>
              <Container 
              className="mb-5">
                <div 
                style={{ marginTop: "20px",   background: 'linear-gradient( #dfe4e7, #909497)',}}
                class="appointment">
                  <form>
                    <label class="label" >Name: <span class="span">{user.userName}</span></label>
                    <label class="label" >Designation: <span class="span">{user.role}</span></label>
                    <label class="label" >Gmail ID: <span class="span">{user.email}</span></label>
                  </form>
                </div>
                <div style={{ background: 'linear-gradient(#dfe4e7, #01555B)', padding: "5px", borderRadius: "10px", height: "200px", width: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", margin:"20px 0 0 35%" }}>
                  <Typography variant="h5" style={{ marginBottom: "10px", color: "black" }}>
                    No. of Patients Today
                </Typography>
                <Typography variant="h3" style={{ color: "#ffcc00" }}>
                  {todaysAppointments.length}
                </Typography>
              </div>

              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ReceptionistDashboard;