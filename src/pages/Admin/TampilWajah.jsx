import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./TampilWajah.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { format } from 'date-fns';
function TampilWajah() {
    const token = localStorage.getItem("token");
    const [data, setData] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3000/admin/tampilwajah`, {
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
    if (!token) {
        return <Navigate to={"/login"} />;
    }
    return (
        <DashboardLayout>
            <div className={styles.wrapper}>
                <div className={styles.topWrapper}>
                    <h2 className={styles.pageTitle}>Report Wajah</h2>
                    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                        <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                            Home
                        </Link>
                        <Typography className={styles.breadUnactive}>Report Wajah</Typography>
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
                                        {/* <th>Suhu</th>
                    <th>Status Suhu</th>
                    <th>Nama   Device</th>
                    <th>Waktu</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.map((temp) => (
                                        temp.fotowajahs.map((temp1, index) => (
                                            <tr key={temp.id}>
                                                <td>{index + 1}</td>
                                                <td>{temp.nama}</td>
                                                <td>
                                                    <img
                                                        src={"data:image/jpeg;base64," + temp1.base64}
                                                        alt=''
                                                        style={{ width: '100px', height: '100px' }}
                                                        className='rounded-circle'
                                                    />

                                                </td>
                                            </tr>
                                        ))
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

export default TampilWajah;
