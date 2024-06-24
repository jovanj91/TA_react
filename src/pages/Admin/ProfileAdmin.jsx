import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
//import styles from "./Profile.module.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import styles from "./TampilWajah.module.css";
import Button from '@mui/material/Button';
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
//import "../../assets/css/Profile.css";
import { format } from 'date-fns';
import axios from "axios";
import swal from "sweetalert";
function ProfileAdmin() {
    const navigate = useNavigate()
    const email = localStorage.getItem("Email");
    const nama = localStorage.getItem("Nama");
    const [provinsi, setProvinsi] = useState([]);
    //const [data, setData] = useState("");
    const [post, setpost] = useState({
        fullName: "",
        mobile: "",
        address: "",
        province:"",
        city: "",
        postalCode: "",        
    });
    useEffect(() => {
        const apiUrl = 'https://dev.farizdotid.com/api/daerahindonesia/provinsi';
        axios.get(apiUrl)
          .then(response => {
            setProvinsi(response.data.provinsi);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    function handle(e) {
        const newdata = { ...post };
        newdata[e.target.id] = e.target.value;
        setpost(newdata);
    }
    function submit(e) {
        e.preventDefault();
        console.log(post);
        axios.put(
            'http://localhost:3000/admin/updateprofileadmin',
            {
                fullName: post.fullName,
                mobile: post.mobile,
                address: post.address,
                province: post.province,
                city: post.city,
                postalCode: post.postalCode,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((res) => {
                console.log(res)
                if(res.data.status == 200){
                setTimeout(() => {
                    swal({
                        title: "Login Berhasil!",
                        icon: "success",
                        button: "OK!",
                    });
                    window.location.reload()
                }, 2000)
            }
            });
    }
    // useEffect(() => {
    //     axios.get(`http://localhost:3000/admin/updateprofileadmin`, {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res.data.data[0])
    //             setData(res.data.data[0]);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const keluar = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Email");
        localStorage.removeItem("Nama");

    };

    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={"/login"} />;
    }


    return (
        <DashboardLayout>
            <div className={styles.wrapper}>
                <div className={styles.topWrapper}>
                    <h2 className={styles.pageTitle}>Profile</h2>
                    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                        <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                            Home
                        </Link>
                        <Typography className={styles.breadUnactive}>Profile</Typography>
                    </Breadcrumbs>
                </div>
                <div>


                    <div className="container mt-4">
                        <div className="row profile">
                            <div className="col-md-4">
                                <div className="profile-sidebar">
                                    <div className="profile-userpic">
                                        <img
                                            src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                                            className="img-responsive center-block d-block mx-auto"
                                            alt=""
                                        />
                                    </div>
                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                                            {nama}
                                        </div>
                                    </div>
                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                                            <p>{email} </p>
                                        </div>
                                    </div>
                                    <div className="profile-usertitle">
                                    <a href="/addprofile">
                                                <button className="btn btn-primary">Edit Profile</button>
                                            </a>
                                            </div>
                                    {/* <div className="profile-usermenu">
                  <ul className="nav">
                    <li className="active">
                      <Link to={"/profile"}>
                        <i className="glyphicon glyphicon-home" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to={"/addprofile"}>
                        <i className="glyphicon glyphicon-file" />
                        Upload Data Pribadi
                      </Link>
                    </li>
                    <li>
                      <Link to={"/kontak-pribadi"}>
                        <i className="glyphicon glyphicon-file" />
                        Kontak Pribadi
                      </Link>
                    </li>
                    <li>
                      <Link to={"/upload-berkas"}>
                        <i className="glyphicon glyphicon-file" />
                        Upload Berkas
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} onClick={keluar}>
                        <i className="glyphicon glyphicon-log-out"></i>
                        Keluar
                      </Link>
                    </li>
                  </ul>
                </div> */}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="profile-content">

                                
                                    <div className="row g-3">

                                        <h3 className="d-flex align-items-center mb-3">
                                          <b> Upload Data Perusahaan </b> 
                                        </h3>
                                        <form action="" onSubmit={submit}>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Nama Perusahaan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="fullName"
                                                    id="fullName"
                                                    value={post.fullName}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Pens"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    No HP Perusahaan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="mobile"
                                                    id="mobile"
                                                    value={post.mobile}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="081xx"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Alamat Perusahaan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="address"
                                                    id="address"
                                                    value={post.address}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Jl damai 1 no 1 SDR 1"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Provinsi Perusahaan
                                                </label>
                                                <select
                                                    defaultValue={"DEFAULT"}
                                                    className="input-control"
                                                    aria-label=".form-select-lg example"
                                                    id="province"
                                                    value={post.province}
                                                    name="province"
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Jawa Timur"
                                                    required
                                                >
                                                    <option value={"DEFAULT"}>Pilih Provinsi Anda</option>
                                                    {provinsi.map(region => (
                                                    <option value={region.nama} key={region.id}>{region.nama}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Kota Perusahaan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="city"
                                                    id="city"
                                                    value={post.city}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Madura"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    KodePos Perusahaan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="postalCode"
                                                    id="postalCode"
                                                    value={post.postalCode}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="60011"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="glyphicon glyphicon-floppy-saved"></i>
                                                    Simpan
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </DashboardLayout >
    );
}
export default ProfileAdmin;