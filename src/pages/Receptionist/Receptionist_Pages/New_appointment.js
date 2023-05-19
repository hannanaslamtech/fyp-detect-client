import React, { useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Header from "../Header/Header";
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import ToastComp from "../../../components/Toast/Toast_Comp";
import AlertComp from "../../../components/Alert/Alert_Comp";
import Spinnercomp from "../../../components/Spinner/Spinner_comp";
import backgroundImage from '../adminBackground.jpg';
import "./New_appointment.css";

const New_appointment = () => {
  const [dates, setDate] = useState(null)
  const [doctors, setDoctor]=useState([])
  const [doctor1,setDoctor1]=useState(null)
  const [mobileNo,setMobileno]=useState('')
  const [fees,setfees]=useState('')
  const [staff,setStaff]=useState('')
  const [radiologist, setRadiologist]=useState([])
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
 
  
  const radiologistList = async () => {
    const user = await Axios.get("https://detect-fyp-server.vercel.app/users/radiologist",{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })
    setRadiologist(user.data.RadiologistInfo)
    console.log(user.data.RadiologistInfo)
  };

  const doctorList = async () => {
    const user = await Axios.get("https://detect-fyp-server.vercel.app/users/doctor",{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })
    setDoctor(user.data.doctorInfo)
    console.log(user.data.doctorInfo)
  };

  useEffect(() => {
    doctorList();
    radiologistList();
  }, []);

  const generateReceiptContent = () => {
  return `
    <table>
      <tr>
        <td>Appointment Date/Time:</td>
        <td>${dates}</td>
      </tr>
      <tr>
        <td>Patient Mobile No.:</td>
        <td>${mobileNo}</td>
      </tr>
      <tr>
        <td>Doctor's Name:</td>
        <td>${doctor1}</td>
      </tr>
      <tr>
        <td>Staff:</td>
        <td>${staff}</td>
      </tr>
      <tr>
      <td>Fees:</td>
      <td>${fees}</td>
    </tr>
    </table>
  `;
};

  const userbyid=async()=>{
    const user=await Axios.get(`https://detect-fyp-server.vercel.app/users/userbyid/${doctor1}`)
    console.log(user);
  }

  const handlePrintReceipt = () => {
    handleSubmit();
    userbyid();
    const receiptContent = generateReceiptContent();
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write(`<html><head><title>Appointment Receipt</title></head><body>${receiptContent}</body></html>`);
    printWindow.print();
    printWindow.close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log(mobileNo);
    console.log(staff);
    console.log(doctor1);
    console.log(dates);
    console.log(fees);
  
    try {
      const response = await fetch("https://detect-fyp-server.vercel.app/users/addNewAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNo,
          doctor1,
          dates,
          paid_fees: fees,
        }),
      });
    
      const result = await response.json();
      setLoading(false);
      console.log(result);
    
      if (result.errors) {
        setError(result.errors);
      } else {
        setToast(true);
        setError({});
        setTimeout(() => {
          history.push("/login");
        }, 3000);
        clearTimeout();
      }
    } catch (error) {
      console.log(error);
    }
    
     await Axios.post("https://detect-fyp-server.vercel.app/users/AllAppointment",
    {
      mobileNo,
      doctor1,
      dates,
      paid_fees:fees,
    }
  );
  };

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
          

              <ToastComp
          setToast={setToast}
          renderToast={toast}
          msg="Added Succesfully"
        />
              <div class="appointment"
              style={{ background: 'linear-gradient(to right, #dfe4e7, #909497)'}}
              >
                   {loading && <Spinnercomp />}
                {error && error.user && (
                  <AlertComp variant="danger" msg={error.user} />
                )}
                <form onSubmit={handleSubmit}>
                  <label for="fname">Patient Contact No.</label>
                  <input class="input_submit" type="text" pattern="03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}" placeholder="Mobile Number" required 
                  onChange={(e)=>{
                    setMobileno(e.target.value)
                  }}  
                  />

                  <label for="country">Select Staff</label>
                  <select class="input_submit" id="country" name="country"
                  onChange={(e)=>{
                    setStaff(e.target.value)
                  }}
                  required 
                  value={staff}
                  >
                    <option value="doctor">Doctor</option>  
                    <option value="radiologist">Radiologist</option>
                  </select>

                  <select class="input_submit" id="country" name="country"
                  onChange={(e)=>{
                    setDoctor1(e.target.value)
                  }}
                  required 
                  value={doctor1}
                  >
                    {staff==='doctor'&&doctors && doctors.length>0 ? doctors.map((d)=>{
                      return(
                        <option value={d._id} >{d.userName}</option>
                      )
                    }):null
                    }
                    {staff==='radiologist'&&radiologist&&radiologist.length>0?radiologist.map((d)=>{
                      return(
                        <option value={d._id} >{d.userName}</option>
                      )
                    }):null}
                  </select>
                  <label >Select Date/Time</label>
                  <div className="app_comp" > <DateTimePicker 
                  onChange={(newValue) => {
                    setDate(newValue)
                  }
                  } required  value={dates} /> </div>
                  
                    <label for="fees">Checkup fees.</label>
                  <input class="input_submit" type="text"  placeholder=" Fees" required 
                  onChange={(e)=>{
                    setfees(e.target.value)
                  }}  
                  />
                  <button class="button-34" type="submit">Set Appointment</button>

                  <button class="button-34"  onClick={() => { handlePrintReceipt(); }}>Print Receipt</button>
                </form>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default New_appointment