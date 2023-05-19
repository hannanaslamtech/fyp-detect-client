import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import Header from "../Header/Header";
import backgroundImage from './adminBackground.jpg';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Axios from "axios";


const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const userList = async () => {
    const doctor_count = await Axios.get("https://detect-fyp-server.vercel.app/users/doctor", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("auth_token")
      }
    })
    setData(doctor_count.data.doctorInfo)
    // console.log(user.data.teacherInfo)

    const radiologist_count = await Axios.get("https://detect-fyp-server.vercel.app/users/radiologist", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("auth_token")
      }
    })
    setData2(radiologist_count.data.RadiologistInfo)
    // console.log(user.data.teacherInfo)
    const receptionist_count = await Axios.get("https://detect-fyp-server.vercel.app/users/receptionist", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("auth_token")
      }
    })
    setData3(receptionist_count.data.receptionistInfo)

  };
  useEffect(() => {
    userList()

  }, []);

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
                <div
                  style={{ marginTop: "20px", background: 'linear-gradient( #dfe4e7, #909497)', }}
                  class="appointment">
                  <form>
                    <label class="label" >Name: <span class="span">{user.userName}</span></label>
                    <label class="label" >Designation: <span class="span">{user.role}</span></label>
                    <label class="label" >Gmail ID: <span class="span">{user.email}</span></label>
                  </form>
                </div>

                <div style={{ marginTop:'20px', display: "flex", justifyContent: "space-between" }}>
                  <div style={{ margin: "0 0 0 12%", flex: "1" }}>
                  <div style={{ background: 'linear-gradient(#dfe4e7, #01555B)', padding: "5px", borderRadius: "10px", height: "150px", width: "175px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                  <Typography variant="h6" style={{ marginBottom: "10px", color: "black" }}>
                    Doctors
                  </Typography>
                  <Typography variant="h3" style={{ color: "#ffcc00" }}>{data.length}</Typography>
                </div>
                  </div>
                  <div style={{ margin: "0 5px", flex: "1" }}>
                  <div style={{ background: 'linear-gradient(#dfe4e7, #01555B)', padding: "5px", borderRadius: "10px", height: "150px", width: "175px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                  <Typography variant="h6" style={{ marginBottom: "10px", color: "black" }}>
                    Radiologists
                  </Typography>
                  <Typography variant="h3" style={{ color: "#ffcc00" }}>{data2.length}</Typography>
                </div>
                  </div>
                  <div style={{ margin: "0 5px", flex: "1" }}>
                  <div style={{ background: 'linear-gradient(#dfe4e7, #01555B)', padding: "5px", borderRadius: "10px", height: "150px", width: "175px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                  <Typography variant="h6" style={{ marginBottom: "10px", color: "black" }}>
                    Receptionists
                  </Typography>
                  <Typography variant="h3" style={{ color: "#ffcc00" }}>{data3.length}</Typography>
                </div>
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



export default Dashboard;


