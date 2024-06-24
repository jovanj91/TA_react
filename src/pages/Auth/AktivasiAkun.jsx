import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
// import forgotpassword from "../assets/img/forgot-password.png";
import "../../assets/css/Sign.css";
import axios from "axios";

function AktivasiAkun() {
    const params = useParams()
    const [alert, setAlert] = useState("");
    useEffect(() => {
    axios
        .get(`http://localhost:3000/user/aktivasiAkun/${params.id}`)
        .then(res => {
         console.log(res)
         if(res.status === 201){
         setAlert(res.data)
         }
        });
    }, []);
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
                        <h1 className="auth-header-title">Aktivasi Akun</h1>
                        {/* <p className="auth-header-subtitle">Lupa Password</p> */}
                    </div>
                    <div className="auth-body">

                        <div className="alert alert-primary" role="alert">
                           {alert.message}
                        </div>
                            <Link className="btn-submit" to={"/login"}>OK</Link>
                    

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AktivasiAkun;