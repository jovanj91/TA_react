import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import DashboardNav from "../../components/navbars/dashboard-nav/DashboardNav";
import DashboardSidebar from "../../components/sidebars/dashboard-sidebar/DashboardSidebar";
import DashboardSidebarAdmin from "../../components/sidebarsAdmin/dashboard-sidebar/DashboardSidebarAdmin";
import styles from "./DashboardLayout.module.css";
import axios from "axios";
function DashboardLayout(props) {
  const [data, setData] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3000/user/loguser`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => {
        console.log(res.data.data)
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const token = localStorage.getItem("token");
  if (!token) {
      return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className={styles.wrapper}>
        {data.role === true ? (
          <DashboardNav />
        ) : (
          <DashboardNav />
        )}
        <div className={styles.main}>
        {data.role === true ? (
          <DashboardSidebarAdmin />
        ):(
          <DashboardSidebar />
        )}
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
