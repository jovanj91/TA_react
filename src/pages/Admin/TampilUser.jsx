import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./TampilWajah.module.css";
import Button from '@mui/material/Button';
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { format } from 'date-fns';
function TampilUser() {
    const token = localStorage.getItem("token");
    const [data, setData] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3000/admin/tampiluser`, {
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
    const onDelete = (e, tempId) => {
        e.preventDefault();
        var config = {
            method: 'delete',
            // maxBodyLength: Infinity,
            url: `http://localhost:3000/datawajah/deleteprofile/${tempId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
    if (!token) {
        return <Navigate to={"/login"} />;
    }
    return (
        <DashboardLayout>
            <div className={styles.wrapper}>
                <div className={styles.topWrapper}>
                    <h2 className={styles.pageTitle}>Kelola User</h2>
                    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                        <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                            Home
                        </Link>
                        <Typography className={styles.breadUnactive}>Kelola User</Typography>
                    </Breadcrumbs>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="card mt-4">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Email</th>
                                        <th>Username</th>   
                                        <th>Action</th>
                                        {/* <th>Suhu</th>
                    <th>Status Suhu</th>
                    <th>Nama   Device</th>
                    <th>Waktu</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.map((temp, index) => (
                                        <tr key={temp.id}>
                                            <td>{index + 1}</td>
                                            <td>{temp.email}</td>
                                            <td>
                                                {temp.username}
                                            </td>
                                            <td>
                                                <Button   variant="contained" color="success"> 
                                                 <Link to={`/detailuser/${temp.id}`} className="text-decoration-none active">
                                                    <h6 className="text-light">Detail User</h6>
                                                </Link>
                                                </Button>
                                                <Button   variant="contained" color="success"> 
                                                 <Link to={`/detaildevice/${temp.id}`} className="text-decoration-none active">
                                                    <h6 className="text-light">Detail device</h6>
                                                </Link>
                                                </Button>
                                             
                                            </td>
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

export default TampilUser;
