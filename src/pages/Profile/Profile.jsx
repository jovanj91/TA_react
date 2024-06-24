import React, { useCallback, useRef, useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import styles from "./Profile.module.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import "../../assets/css/Profile.css";
import { format } from 'date-fns';
import axios from "axios";
import swal from "sweetalert";
function Profile() {
    const navigate = useNavigate()
    const email = localStorage.getItem("Email");
    const nama = localStorage.getItem("Nama");
    const [provinsi, setProvinsi] = useState([]);
    const [kota, setkota] = useState([]);
    const [data, setData] = useState("");
    const [post, setpost] = useState({
        namalengkap: "",
        tempatlahir: "",
        tanggallahir: "",
        jeniskelamin: "",
        nohp: "",
        provinsi: "",
        kota: "",
        kodepos: "",
        alamat: "",
        agama: "",
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
      useEffect(() => {
       
        const apiUrl ='https://alamat.thecloudalert.com/api/kabkota/get';
        axios.get(apiUrl)
          .then(response => {
            setkota(response.data.result);
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
            'http://localhost:3000/datawajah/updateprofile',
            {
                namalengkap: post.namalengkap,
                tempatlahir: post.tempatlahir,
                tanggallahir: post.tanggallahir,
                jeniskelamin: post.jeniskelamin,
                nohp: post.nohp,
                provinsi: post.provinsi,
                kota: post.kota,
                kodepos: post.kodepos,
                alamat: post.alamat,
                agama: post.agama,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((res) => {
                setTimeout(() => {
                    swal({
                        title: "Data Berhasil Di Simpan!",
                        icon: "success",
                        button: "OK!",
                    });
                    window.location.reload()
                }, 2000)
            });
    }
    useEffect(() => {
        axios.get(`http://localhost:3000/datawajah/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((res) => {
                console.log(res.data.data[0])
                setData(res.data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

                                    {data !=null && data.namalengkap != null ? (
                                        // data.map((temp) => (
                                        <div className="row g-3" key={data.id}>

                                            <h3 className="d-flex align-items-center mb-3">
                                                Data Pribadi
                                            </h3>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Nama Lengkap
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.namalengkap}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Tempat Lahir
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.tempatlahir}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Tanggal Lahir
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {format(new Date(data.tanggallahir), 'dd/MM/yyyy')}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Jenis Kelamin
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.jeniskelamin}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Agama
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.agama}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    NO WA
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.nohp}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Alamat
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.alamat}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Provinsi
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.provinsi}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Kota
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.kota}
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Kode Pos
                                                </label>
                                                <label htmlFor="" className="form-control">
                                                    {data.kodepos}
                                                </label>
                                            </div>
                                       
                                        </div>
                                        //  ))
                                    ) : (<div className="row g-3">

                                        <h3 className="d-flex align-items-center mb-3">
                                          <b> Upload Data Pribadi </b> 
                                        </h3>
                                        <form action="" onSubmit={submit}>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Nama Lengkap
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="namalengkap"
                                                    id="namalengkap"
                                                    value={post.namalengkap}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Muhammad Zaid"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Tempat Lahir
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="tempatlahir"
                                                    id="tempatlahir"
                                                    value={post.tempatlahir}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Surabaya"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Tanggal Lahir
                                                </label>
                                                <input
                                                    type="date"
                                                    className="input-control"
                                                    name="tanggallahir"
                                                    id="tanggallahir"
                                                    value={post.tanggallahir}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="20/febuari/2002"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Jenis Kelamin
                                                </label>
                                                <select
                                                    defaultValue={"DEFAULT"}
                                                    className="input-control"
                                                    aria-label=".form-select-lg example"
                                                    id="jeniskelamin"
                                                    value={post.jeniskelamin}
                                                    onChange={(e) => handle(e)}
                                                    required
                                                >
                                                    <option value={"DEFAULT"}>Pilih Jenis Kelamin</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Agama
                                                </label>
                                                <select
                                                    defaultValue={"DEFAULT"}
                                                    className="input-control"
                                                    aria-label=".form-select-lg example"
                                                    id="agama"
                                                    name="agama"
                                                    value={post.agama}
                                                    onChange={(e) => handle(e)}
                                                    required
                                                >
                                                    <option value={"DEFAULT"}>Pilih salah satu..</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Kristen Protestan">Kristen Protestan</option>
                                                    <option value="Kristen Katolik">Kristen Katolik</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Buddha">Buddha</option>
                                                    <option value="Konghucu">Konghucu</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    NO WA
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="nohp"
                                                    id="nohp"
                                                    value={post.nohp}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="081xxx"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Alamat
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="alamat"
                                                    id="alamat"
                                                    value={post.alamat}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Jln Mulia 1 no 10 SDR 2"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Provinsi
                                                </label>
                                                <select
                                                    defaultValue={"DEFAULT"}
                                                    className="input-control"
                                                    aria-label=".form-select-lg example"
                                                    id="provinsi"
                                                    value={post.provinsi}
                                                    onChange={(e) => handle(e)}
                                                    placeholder={data.provinsi}
                                                    required
                                                >
                                                    <option value={"DEFAULT"}>Pilih Provinsi Anda</option>
                                                    {provinsi.map(region => (
                                                    <option value={region.nama}>{region.nama}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Kota
                                                </label>
                                                {/* <input
                                                    type="text"
                                                    className="input-control"
                                                    name="kota"
                                                    id="kota"
                                                    value={post.kota}
                                                    onChange={(e) => handle(e)}
                                                    placeholder="Madura"
                                                    autoComplete="off"
                                                    required
                                                /> */}
                                                 <select
                                                    defaultValue={"DEFAULT"}
                                                    className="input-control"
                                                    aria-label=".form-select-lg example"
                                                    id="kota"
                                                    value={post.kota}
                                                    onChange={(e) => handle(e)}
                                                    placeholder={data.kota}
                                                    required
                                                >
                                                    <option value={"DEFAULT"}>Pilih Kota Anda</option>
                                                    {kota.map(region => (
                                                    <option value={region.text}>{region.text}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Kode Pos
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="kodepos"
                                                    id="kodepos"
                                                    value={post.kodepos}
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

                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </DashboardLayout >
    );
}
export default Profile;