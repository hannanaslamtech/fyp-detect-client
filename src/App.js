import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState} from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import DashBoard from "./pages/StaffManager/DashBoard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import StaffRegister from "./pages/RegisterStaff/RegisterStaff";
import PatientRegister from "./pages/RegisterPatient/RegisterPatient";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StaffRoute from "./components/PrivateRoute/StaffRoute";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import ReceptionistRoute from "./components/PrivateRoute/ReceptionistRoute";
import RadiologistRoute from "./components/PrivateRoute/RadiologistRoute"
import DoctorRoute from "./components/PrivateRoute/DoctorRoute";
import StudentInfo from "./pages/Admin/Staff/StaffInfo";
import ReceptionistsInfo from "./pages/StaffManager/DashBoard/Receptionists_Record/Receptionist_Info";
import DoctorsInfo from "./pages/StaffManager/DashBoard/Doctors_Record/Doctor_Info";
import RadiologistsInfo from "./pages/StaffManager/DashBoard/Radiologists_Record/Radiologist_Info";
import EditStaff from "./pages/Edit/EditStaff";
import EditPatient  from "./pages/Edit/EditPatient"
import PatientInfo from "./pages/Receptionist/Receptionist_Pages/Patient_Record/Patient_Info";
import RadiologistDashboard from "./pages/Radiologist/RadiologistDashboard";
import RadiologistTodaySchedule from "./pages/Radiologist/Radiologist_pages/Schedule_radiologist"
import AllReports from "./pages/Radiologist/Radiologist_pages/reports"
import DoctorDashboard from "./pages/Doctor/DoctorDashboard"
import DoctorTodaySchedule from "./pages/Doctor/Doctor_pages/Schedule"
import ReceptionistDashboard from "./pages/Receptionist/ReceptionistDashboard";
import TodaySchedule from "./pages/Receptionist/Receptionist_Pages/today_schedule";
import NewAppointment from "./pages/Receptionist/Receptionist_Pages/New_appointment";
import SplashScreen from "./splashscreen.jpg";



const Routing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch({ type: "SET__USER", payload: user });
    }
  }, [dispatch, history, user]);
  
  return (
    <Switch>
      <StaffRoute exact path="/">
        <DashBoard />
      </StaffRoute>
      <StaffRoute exact path="/Receptionist_Info">
       <ReceptionistsInfo/>
      </StaffRoute>
      <StaffRoute exact path="/Doctor_Info">
        <DoctorsInfo/>
      </StaffRoute>
      <StaffRoute exact path="/Radiologist_Info">
        <RadiologistsInfo/>
      </StaffRoute>

      <ReceptionistRoute exact path="/Receptionist-dashboard">
        <ReceptionistDashboard />
      </ReceptionistRoute>
      <ReceptionistRoute exact path="/today_schedule">
        <TodaySchedule />
      </ReceptionistRoute>

      <ReceptionistRoute exact path="/new_appointment">
        <NewAppointment />
      </ReceptionistRoute>
      <ReceptionistRoute exact path="/new_patient">
      <PatientInfo/>
      </ReceptionistRoute>



     
      <AdminRoute exact path="/admin-dashboard">
        <AdminDashboard />
      </AdminRoute>

     
      
      <AdminRoute exact path="/admin/student-info">
        <StudentInfo />
      </AdminRoute>
   
   <RadiologistRoute exact path="/Radiologist-dashboard">
    <RadiologistDashboard/>
   </RadiologistRoute>
   <RadiologistRoute exact path="/schedule">
    <RadiologistTodaySchedule/>
   </RadiologistRoute>
   <RadiologistRoute exact path="/reports">
    <AllReports/>
   </RadiologistRoute>

   <DoctorRoute exact path="/Doctor-dashboard"> 
   <DoctorDashboard/>
   </DoctorRoute>
   <Route exact path="/schedule-doctor"> 
   <DoctorTodaySchedule/>
   </Route>
      
      
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/Staff-register">
       <StaffRegister/>
      </Route>
      <Route exact path ="/Patient-register">
<PatientRegister/>
        </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      
      <Route exact path="/edit-staff">
        <EditStaff />
      </Route>
      <Route exact path="/edit-patient">
        <EditPatient/>
      </Route>
    </Switch>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Set the time for how long you want the splash screen to appear (in milliseconds)
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="splash-screen">
          <img className="img_splash" src={SplashScreen} alt="Splash Screen" />
        </div>
      ) : (
        <Router>
        <Routing/>
        </Router>
      )}
    </div>
  );
}


export default App;
