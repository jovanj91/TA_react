import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import logo from "../assets/img/logo.png";
import "../../assets/css/Sign.css";

function Signup() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const url =
      "http://localhost:3000/user/register";

    const changeNama = (e) => {
      const value = e.target.value;
      setNama(value);
    };

    const changeEmail = (e) => {
      const value = e.target.value;
      setEmail(value);
    };

    const changePassword = (e) => {
      const value = e.target.value;
      setPassword(value);
    };



  const klikDaftar = (e) => {
    e.preventDefault();
    const data = {
      username: nama,
      email: email,
      password: password,
    
    };
    axios.post(url, data).then((result) => {
      if (result) {
        if (result.data) {
          // console.log(result.data);
          setNama("");
          setEmail("");
          setPassword("");
   
          setAlert("Data Berhasil diSimpan");
          setTimeout(() => {
            setAlert("");
          }, 3000);
        }
      }
    });
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <div className="auth-header-logo">
              {/* <img src={logo} alt="" className="auth-header-logo-img" /> */}
            </div>
            <h1 className="auth-header-title">Create Account</h1>
            <p className="auth-header-subtitle">Buat Akun</p>
          </div>
          <div className="auth-body">
            <form action="" className="auth-form-validation">
              {alert && (
                <div className="alert alert-primary">
                  <p>{alert}</p>
                </div>
              )}
              <div className="input-field">
                <label htmlFor="" className="input-label">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="input-control"
                  name="nama"
                  id="nama"
                  value={nama}
                  onChange={changeNama}
                  placeholder="Muhammad Sadewo Wicaksono"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="" className="input-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input-control"
                  name="email"
                  id="email"
                  value={email}
                  onChange={changeEmail}
                  placeholder="contoh@gmail.com"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  className="input-control"
                  name="password"
                  id="password"
                  value={password}
                  onChange={changePassword}
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
              </div>
             
              <button type="submit" className="btn-submit" onClick={klikDaftar}>
                Buat Akun
              </button>
            </form>
            <p className="text-center">
              Sudah Punya Akun ?
              <Link to={"/login"} className="link-text-center">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
