import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import {Typography } from "@material-ui/core";
import Header from "./Header/Header";
import Styles from "./AdminDashboard.module.css";
import "./AdminDashboard.css"
import { useSelector } from "react-redux";
import backgroundImage from './adminBackground.jpg';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";



const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState([]);
  const userList = async () => {
    const user = await Axios.get("https://detect-fyp-server.vercel.app/users/staff-manager", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    });
    setData(user.data.staffInfo);
  };

  const getAppointment = async () => {
    const response = await Axios.get("https://detect-fyp-server.vercel.app/users/getAppointment");
    setAppointments(response.data.AppointmentInfo);
  };

  useEffect(() => {
    userList();
    getAppointment();
  }, []);

  const chartData = appointments.map((appointment) => ({
    date: new Date(appointment.date_Time).toLocaleDateString(),
    paidFees: appointment.paid_fees,
  }));

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
            <Col
              md={1}
              sm={12}
              className={`d-none d-md-block`}
            >
            </Col>
            <Col md={10} className={Styles.main__body}>
              <Container>
                <div
                  style={{ marginTop: "20px", background: 'linear-gradient( #dfe4e7, #909497)', }}
                  class="appointment">
                  <form>
                    <label class="label" >Name: <span class="span">{user.userName}</span></label>
                    <label class="label" >Designation: <span class="span">{user.role}</span></label>
                    <label class="label" >Gmail ID: <span class="span">{user.email}</span></label>
                  </form>
                </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <div
                    style={{
                      background: 'linear-gradient(#dfe4e7, #01555B)',
                      padding: "5px",
                      borderRadius: "10px",
                      height: "150px",
                      width: "180px",
                      display: "flex",
                      marginTop: "50px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ marginBottom: "10px", color: 'black' }}
                    >
                      Staff Managers
                    </Typography>
                    <Typography variant="h3" style={{ color: "#ffcc00" }}>
                      {data.length}
                    </Typography>
                  </div>

                  <div style={{ background: 'linear-gradient(#dfe4e7, #01555B)', marginTop: "20px", height: "250px", width: '850px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
                        <XAxis dataKey="date" axisLine={{ stroke: '#000000' }} tick={{ fill: '#000000' }} />
                        <YAxis axisLine={{ stroke: '#000000' }} tick={{ fill: '#000000' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="paidFees" stroke="#ffcc00" />
                      </LineChart>


                    </ResponsiveContainer>
                  </div>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminDashboard;
