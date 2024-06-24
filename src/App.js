import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Skeleton } from "antd";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import Dashboard from "./pages/Dashboard/Dashboard";
import FaceTrain from "./pages/FaceTrain/FaceTrain";
import Report from "./pages/Report/Report";
import Device from "./pages/UserList/UserList";
import Start from "./pages/Start/Start/Start";
import Login from "./pages/Auth/Signin";
import Register from "./pages/Auth/Signup";
import RegisterAdmin from "./pages/Auth/SignupAdmin";
import Profile from "./pages/Profile/Profile";
import AddProfile from "./pages/Profile/AddProfile";
import TampilWajah from "./pages/Admin/TampilWajah";
import TampilPengunjung from "./pages/Admin/TampilPengunjung";
import TampilUser from "./pages/Admin/TampilUser";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AktivasiAkun from "./pages/Auth/AktivasiAkun";
import ResetPassword from "./pages/Auth/ResetPassword";
import DetailUser from "./pages/Admin/DetailUser";
import DetailDevice from "./pages/Admin/DetailDevice";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
// import TampilWajah from "./pages/Admin/TampilWajah";
// import TampilPengunjung from "./pages/Admin/TampilWajah";

const App = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dashboardadmin" element={<DashboardAdmin />}></Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/registeradmin" element={<RegisterAdmin />} ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} ></Route>
          <Route path="/user/aktivasiAkun/:id" element={<AktivasiAkun />} ></Route>
          <Route path="/user/resetpassword/:id/:token" element={<ResetPassword />} ></Route>
          <Route path="/face-train" element={<FaceTrain />} ></Route>
          <Route path="/report" element={<Report />} ></Route>
          <Route path="/start" element={<Start />} ></Route>
          <Route path="/device" element={<Device />} ></Route>
          <Route path="/profile" element={<Profile />} ></Route>
          <Route path="/profileadmin" element={<ProfileAdmin />} ></Route>
          <Route path="/addprofile" element={<AddProfile />} ></Route>
          <Route path="/tampilwajah" element={<TampilWajah />} ></Route>
          <Route path="/tampilpengunjung" element={<TampilPengunjung />} ></Route>
          <Route path="/tampiluser" element={<TampilUser />} ></Route>
          <Route path="/detailuser/:id" element={<DetailUser />} ></Route>
          <Route path="/detaildevice/:id" element={<DetailDevice />} ></Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
