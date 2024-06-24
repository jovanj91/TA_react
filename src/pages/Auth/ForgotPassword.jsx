import React, { useState } from "react";
import { Link } from "react-router-dom";
// import forgotpassword from "../assets/img/forgot-password.png";
import "../../assets/css/Sign.css";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const changeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
  };

  const kirim = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email Harus Diisi");
    } else {
      axios
        .put('http://localhost:3000/user/forgotpassword', {
          email: email
        })
        .then(res => {
          console.log(res)
          if(res.data.status === 201){
         // setEmail('')
          setAlert('Silahkan Cek Email Anda')
          setTimeout(() => {
            setAlert('')
          }, 3000)
        }
        });
    }
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <div className="auth-header-logo">
              {/* <img
                src={forgotpassword}
                alt=""
                className="auth-header-logo-img"
              /> */}
            </div>
            <h1 className="auth-header-title">Forgot Password</h1>
            <p className="auth-header-subtitle">Lupa Password</p>
          </div>
          <div className="auth-body">
            <form action="" className="auth-form-validation">
              {alert && (
                <div className="alert alert-primary">
                  <p>{alert}</p>
                </div>
              )}
              {error && (
                <div className="alert alert-danger">
                  <p>{error}</p>
                </div>
              )}
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
              <button type="submit" className="btn-submit" onClick={kirim}>
                Kirim
              </button>
              <Link to={"/signin"} className="btn-back-to-login">
                Back to Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ForgotPassword;