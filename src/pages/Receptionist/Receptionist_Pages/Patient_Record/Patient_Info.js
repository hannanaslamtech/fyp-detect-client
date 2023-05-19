import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PatientTable from "./Patient_Table"
import Header from "../../Header/Header";
import "../../Dashboard.css"
import backgroundImage from '../../adminBackground.jpg';

const PatientInfo = () => {
  
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
            <Container className="mb-5">         
              <PatientTable/>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default PatientInfo;

