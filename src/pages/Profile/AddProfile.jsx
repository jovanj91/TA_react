import React, { useCallback, useRef, useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import styles from "./Profile.module.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import "../../assets/css/Profile.css";
import axios from "axios";
import swal from "sweetalert";
function AddProfile() {
    const navigate = useNavigate()
    const email = localStorage.getItem("Email");
    const nama = localStorage.getItem("Nama");
    const [data, setData] = useState("");
    const [provinsi, setProvinsi] = useState([]);
    const [provinsi1, setProvinsi1] = useState([]);
    const [namalengkap, setNamalengkap] = useState("");
    const [tempatlahir, setTempatlahir] = useState("");
    const [tanggallahir, setTanggallahir] = useState("");
    const [jeniskelamin, setJeniskelamin] = useState("");
    const [nohp, setNohp] = useState("");
    const [kota, setKota] = useState("");
    const [kodepos, setKodepos] = useState("");
    const [alamat, setAlamat] = useState("");
    const [agama, setAgama] = useState("");

    // const [post, setpost] = useState({
    //     namalengkap: "",
    //     tempatlahir: "",
    //     tanggallahir: "",
    //     jeniskelamin: "",
    //     nohp: "",
    //     provinsi: "",
    //     kota: "",
    //     kodepos: "",
    //     alamat: "",
    //     agama: "",
    // });
    // useEffect(() => {
    //     const apiUrl = 'https://dev.farizdotid.com/api/daerahindonesia/provinsi';
    //     axios.get(apiUrl)
    //       .then(response => {
    //         setProvinsi(response.data.provinsi);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }, []);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/datawajah/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then((res) => {
                console.log(res)
                setNamalengkap(res.data.data[0].namalengkap)
                setAgama(res.data.data[0].agama)
                setAlamat(res.data.data[0].alamat)
                setJeniskelamin(res.data.data[0].jeniskelamin)
                setKodepos(res.data.data[0].kodepos)
                setKota(res.data.data[0].kota)
                setNohp(res.data.data[0].nohp)
                setProvinsi1(res.data.data[0].provinsi1)
                setTanggallahir(res.data.data[0].tanggallahir)
                setTempatlahir(res.data.data[0].tempatlahir)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // function handle(e) {
    //     const newdata = { ...post };
    //     newdata[e.target.id] = e.target.value;
    //     setpost(newdata);
    // }

    const submit = () => {
        var config = {
            method: 'put',
            url: 'http://localhost:3000/datawajah/updateprofile',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
                'namalengkap': namalengkap,
                // 'tempatlahir' : tempatlahir,
                // 'tanggallahir' : tanggallahir,
                // 'jeniskelamin' : jeniskelamin,
                // 'nohp' : nohp,
                // 'provinsi': provinsi,
                // 'kota' : kota,
                // 'kodepos': kodepos,
                // 'alamat': alamat,
                // 'agama': agama
            }
        };


        axios(config)
            .then(function (response) {
                console.log('cok', (response));
                swal({
                    title: "Update Profile berhasil!",
                    icon: "success",
                    button: "OK!",
                });
                navigate('/profile')
            })
            .catch(function (error) {
                console.log((error));
            });
        // axios.put(
        //     'http://localhost:3000/datawajah/updateprofile',
        //     {
        //       data: data
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem("token")}`,
        //         },
        //     }
        // )
        //     .then((res) => {
        //         // setTimeout(() => {
        //             // if (res.data.data[0]) {

        //             swal({
        //                 title: "Update Profile berhasil!",
        //                 icon: "success",
        //                 button: "OK!",
        //             });
        //             navigate('/profile')
        //         // })
        //         // }, 2000)

        //     });
    }


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
                {/* <div> */}


                    <div className="container mt-4">
                        <div className="row profile">
                            <div className="col-md-4">
                                <div className="profile-sidebar">
                               
                                    <div className="profile-userpic">
                                       <div className="text-center">
                                        <img
                                            src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                                            className="img-responsive center-block"
                                            alt=""
                                        />
                                    </div>
                                    </div>
                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                                          <p>{nama}</p>
                                        </div>
                                    </div>
                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                                            <p>{email} </p>
                                        </div>
                                    </div>
                                   
                                    {/* <div className="profile-usertitle">
                                    <a href="/addprofile">
                                                <button className="btn btn-primary">Edit Profile</button>
                                            </a>
                                            </div> */}
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
                                    {/* 
                                    {data.namalengkap != null ? (
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
                                                    {data.tanggallahir}
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
                                    ) : (<div className="row g-3"> */}
                                    <div className="row g-3">
                                        <h3 className="d-flex align-items-center mb-3">
                                            Upload Data Pribadi
                                        </h3>
                                        <div>
                                            <div className="col-md-6" >
                                                <label htmlFor="" className="form-label">
                                                    Nama Lengkap
                                                </label>
                                                <input
                                                    type="text"
                                                    value={namalengkap}
                                                    onChange={(e) => setNamalengkap(e.target.value)}
                                                    className="input-control"
                                                    name="namalengkap"
                                                    id="namalengkap"
                                                    required

                                                />
                                            </div>
                                            {/* <div className="col-md-6">
                                                <label htmlFor="" className="form-label">
                                                    Tempat Lahir
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="tempatlahir"
                                                    id="tempatlahir"
                                                    value={tempatlahir}
                                                    onChange={(e) => setTempatlahir(e.target.value)}
                                                    placeholder= ""
                                                    autoComplete="off"
                                                
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
                                                    value={tanggallahir}
                                                    onChange={(e) => setTanggallahir(e.target.value)}
                                                    placeholder=""
                                                    autoComplete="off"
                                              
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
                                                    placeholder=""
                                                    value={jeniskelamin}
                                                    onChange={(e) => setJeniskelamin(e.target.value)}
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
                                                    value={agama}
                                                    onChange={(e) => setAgama(e.target.value)}
                                                    placeholder= ""
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
                                                    value={nohp}
                                                    onChange={(e) => setNohp(e.target.value)}
                                                    placeholder= ""
                                                    autoComplete="off"
                                                  
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
                                                    value={alamat}
                                                    onChange={(e) => setAlamat(e.target.value)}
                                                    placeholder= ""
                                                    autoComplete="off"
                                               
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
                                                    value={provinsi1}
                                                    onChange={(e) => setProvinsi1(e.target.value)}
                                                    placeholder= ""
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
                                                <input
                                                    type="text"
                                                    className="input-control"
                                                    name="kota"
                                                    id="kota"
                                                    value={kota}
                                                    onChange={(e) => setKota(e.target.value)}
                                                    placeholder= ""
                                                    autoComplete="off"
                                                
                                                />
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
                                                    value={kodepos}
                                                    onChange={(e) => setKodepos(e.target.value)}
                                                    placeholder= ""
                                                    autoComplete="off"
                                                
                                                />
                                            </div> <br /> */}
                                            <div className="col-md-12">
                                                <button onClick={submit} className="btn btn-primary">
                                                    <i className="glyphicon glyphicon-floppy-saved"></i>
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                {/* </div> */}
            </div>
        </DashboardLayout >
    );
}
export default AddProfile;