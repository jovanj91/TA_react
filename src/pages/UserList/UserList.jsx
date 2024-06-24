import React, { useState, useEffect } from "react";
import { Navigate,Link } from "react-router-dom";
import styles from "./UserList.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import Table from 'react-bootstrap/Table';
import axios from "axios";
function UserList() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`http://localhost:3000/device/lihat`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        console.log(res.data.data)
        setData(res.data.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  if(loading){
    return <p>Loading...</p>
  }
  
  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>Device</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
          <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                Home
              </Link>
            <Typography className={styles.breadUnactive}>Device</Typography>
          </Breadcrumbs>
        </div>
        <div className="container">
          <div className="row">
            <div className="card mt-4">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama User</th>
          <th>Nama Device</th>
          <th>Status Device</th>
        </tr>
      </thead>
      <tbody>
      { data && data.map((temp, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{temp.User.username}</td>
          <td>{temp.device.nama}</td>
          <td>{temp.device.status}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    </div>
    </div>
      </div>
      </div>
    </DashboardLayout>
  );
}

export default UserList;
