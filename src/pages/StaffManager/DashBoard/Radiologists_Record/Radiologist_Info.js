
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../Header/Header";
import backgroundImage from '../adminBackground.jpg';
import ReceptionistTable from "./Radiologist_Table"
import "../Dashboard.css";


const RadiologistInfo = () => {
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
              <ReceptionistTable/>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default RadiologistInfo;

