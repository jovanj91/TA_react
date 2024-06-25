import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import styles from "./TampilWajah.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import Button from '@mui/material/Button';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import { backendBaseApi } from "../../api";
function DetailUser() {
  const params = useParams()
  const token = localStorage.getItem("token");
  const [data, setData] = useState("");
  const [post, setPost] = useState("");
  useEffect(() => {
    axios.get(`${backendBaseApi}/admin/detailuser/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => {
        console.log(res.data.data1)
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios.get(`${backendBaseApi}/device/lihatdevice`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => {
        console.log(res.data.data)
        setPost(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onProgress = (e, id_user) => {

    e.preventDefault();
    // var config = {
    //   method: 'post',
    // // maxBodyLength: Infinity,
    //   url: `${backendBaseApi}/device/pilih/${tempId}`,
    //   id_device: tempId,
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   }
    // };

    // axios(config)
    // .then(function (response) {
    //   console.log(response.data);
    //   window.location.reload()
    // })
    // .catch(function (error) {
    //   console.log(error.data);
    // });
    axios.post(`${backendBaseApi}/device/pilih/${params.id}`, { id_device: id_user }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((responce) => (
      setTimeout(() => {
        window.location.reload()
      }, 2000)

    ))
  }

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>Detail User</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
              Home
            </Link>
            <Typography className={styles.breadUnactive}>Detail User</Typography>
          </Breadcrumbs>
        </div>
        <div className="container mt-4">
        <div className="row">
        <div className="col-md-6">
          {data && data.map((temp, index) => (
            <div className="row profile" key={temp.id}>
              {/* <div className="col-md-6"> */}
                <div className="profile-content">

                  <h3 className="d-flex align-items-center mb-3">
                    Data User
                  </h3>

                  <div>
                    <label htmlFor="" className="form-label">
                      Nama Lengkap
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.namalengkap}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Tempat Lahir
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.tempatlahir}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Tanggal Lahir
                    </label>
                    <label htmlFor="" className="form-control">
                      {format(new Date(temp.tanggallahir), 'dd/MM/yyyy')}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Jenis Kelamin
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.jeniskelamin}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Agama
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.agama}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      NO WA
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.nohp}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Alamat
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.alamat}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Provinsi
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.provinsi}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Kota
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.kota}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Kode Pos
                    </label>
                    <label htmlFor="" className="form-control">
                      {temp.kodepos}
                    </label>
                  </div>
                </div>
              {/* </div> */}

            </div>
          ))}
        </div>
        {/* <div className="col-md-6">
                <div className="profile-content">

                  <h3 className="d-flex align-items-center mb-3">
                    Pilih Device
                  </h3>

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Device</th>
                        <th>Status Device</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {post && post.map((temp1, index) => (

                        <tr key={temp1.id}>
                          <td>{temp1.id}</td>
                          <td>{temp1.nama}</td>
                          <td>{temp1.status}</td>
                          <td>
                            <Button
                              key={temp1.id}
                              variant="contained" color="success"
                              className="col-sm col-md-3 col-lg-3 shadow-sm border-1 border rounded-2 border-secondary px-2 mx-3 py-2 d-flex gap-2 align-items-center my-3 justify-content-center"
                              onClick={(e) => onProgress(e, temp1.id)}
                            >
                              Pilih Device
                            </Button>
                            <Button variant="contained" color="success"
                              onClick={(e) => onProgress(e, temp1.id)}>
                                Pilih Device
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                </div>
              </div> */}
              </div>
              </div>

      </div>
    </DashboardLayout>
  );
}

export default DetailUser;
