import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import logo from "../assets/img/logo.png";
import "../../assets/css/Sign.css";
import swal from "sweetalert";

function Signin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url =
    "http://localhost:3000/user/login";

  const changeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const loginbtn = (e) => {

    e.preventDefault();
    try {
      axios.post(url, { email: email, password: password }).then((response) => {
        console.warn(response.data.token)
        localStorage.setItem('Email', email)
        localStorage.setItem('token', response.data.token)
        swal({
          title: "Login Berhasil!",
          icon: "success",
          button: "OK!",
        });

        axios.get(`http://localhost:3000/user/loguser`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then((res) => {
            localStorage.setItem('Nama', res.data.data.username)
            console.warn(res.data.data.role)
            if (res.data.data.role === true) {
              navigate('/dashboardadmin')
            } else if (res.data.data.role === false) {
              navigate('/profile')
            }
          })
      })
    } catch (error) {
      console.log(error);
      swal({
        title: "Login Gagal!",
        text: 'Terjadi kesalahan. Cek email atau password anda!',
        icon: "error",
        button: "OK"
      });
    }
  };

  return (
    <React.Fragment>
      {/* {redirect && <Navigate to="/home" />} */}
      <div className="wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <div className="auth-header-logo">
              {/* <img src={logo} alt="" className="auth-header-logo-img" /> */}
            </div>
            <h1 className="auth-header-title">Welcome to FARE DOOR</h1>
            <p className="auth-header-subtitle">Login terlebih dahulu.</p>
          </div>
          <div className="auth-body">
            <form action="" className="auth-form-validation">
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
              <div className="flex-end">
                <Link to={"/forgot-password"} className="link-end">
                  Forgot Password ?
                </Link>
              </div>
              <button type="submit" className="btn-submit" onClick={loginbtn}>
                Login
              </button>
            </form>
            <p className="text-center">
              Tidak punya Akun ?
              <Link to={"/register"} className="link-text-center">
                Buat Akun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signin;
