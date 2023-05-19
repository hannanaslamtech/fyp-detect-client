import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../AdminDashboard/Header/Header";
import backgroundImage from '../AdminDashboard/adminBackground.jpg';
import StudentTable from "./StaffTable/StaffTable";
import "./StaffTable/Dashboard.css";

const StudentInfo = () => {
  return (
    <>
    <Header />
    <div style={{
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '100%',
    minHeight: '85vh',
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
            <Container className="mb-5">
              <StudentTable/>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default StudentInfo;
