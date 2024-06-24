import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./Report.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { format } from 'date-fns';
function Report() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState("");
  const [device, setDevice] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3000/datawajah/rekappengunjung`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => {
        console.log(res.data.data[0].device.nama)
        setData(res.data.data);
        setDevice(res.data.data[0].device)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>Report</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
          <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                Home
              </Link>
            <Typography className={styles.breadUnactive}>Report</Typography>
          </Breadcrumbs>
        </div>
        <div className="container">
          <div className="row">
            <div className="card mt-4">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Gambar</th>
                    <th>Suhu</th>
                    <th>Status Suhu</th>
                    <th>Nama Device</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((temp) => (
                    <tr key={temp.id}>
                      <td>{temp.id}</td>
                      <td>{temp.nama}</td>
                      <td>     <img
                        src={"data:image/jpeg;base64," + temp.picture}
                        alt=''
                        style={{ width: '100px', height: '100px' }}
                        className='rounded-circle'
                      /></td>
                      <td>{temp.suhu}</td>
                      <td>{temp.statusSuhu}</td>
                      <td>{device.nama}</td>
                      <td>{format(new Date(temp.waktu), 'dd/MM/yyyy HH:mm:ss')}</td>
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

export default Report;
