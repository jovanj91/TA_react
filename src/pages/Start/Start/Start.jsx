import React, { useCallback, useRef, useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import styles from "./Start.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import { Space, Table, Tag } from 'antd';
import Button from '@mui/material/Button';
import Webcam from "react-webcam";
import axios from "axios";
import * as ml5 from "ml5";
const baseURL = "http://localhost:3000/datawajah/hasilpredict";

// const columns = [
//     {
//         title: 'Datatime',
//         dataIndex: 'Datatime',
//         key: 'Datatime',
//         render: (text) => <a>{text}</a>,
//     },
//     {
//         title: 'Name',
//         dataIndex: 'Name',
//         key: 'Name',
//     },
//     {
//         title: 'Photo',
//         dataIndex: 'Photo',
//         key: 'Photo',
//     },
//     {
//         title: 'Temperature',
//         dataIndex: 'Temperature',
//         key: 'Temperature',
//     },
//     {
//         title: 'Status Temp',
//         dataIndex: 'StatusTemp',
//         key: 'StatusTemp',
//     },
// ];
// const data = [
//     {
//         key: '1',
//         Datatime: 0,
//         Name: 0,
//         Photo: 0,
//         Temperature: 0,
//         StatusTemp: 0,
//     },
// ];
const videoConstraints = {
  width: 420,
  height: 420,
  facingMode: "user",
};

function Start() {
  
  const token = localStorage.getItem("token");

  const [base64, setBase64] = useState(null);
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef();
  const { width, height } = videoConstraints;
  // useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       capture();
  //     }, 5000);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, []);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 224, height: 224 });
    const encodedString = imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    setBase64(imageSrc);
    console.log(encodedString)
    axios.post(baseURL, { base64: encodedString }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((responce) => {
      console.log(responce.data.status)
      if (responce.data.status) {
        setStatus(responce.data.status)
        setData(responce.data.data)
        setInterval(() => {
          window.location.reload()
        }, 20000)
      }
      
    }).catch((err) => {
      setError(err)
    })
  }, [webcamRef]);
  useEffect(() => {
    let detectionInterval;

    const modelLoaded = () => {
      webcamRef.current.video.width = width;
      webcamRef.current.video.height = height;
      canvasRef.current.width = width;
      canvasRef.current.height = height;


      detectionInterval = setInterval(() => {
        detect();
      }, 200);
    };

    const objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    const detect = () => {
      if (webcamRef.current.video.readyState !== 4) {
        console.warn('Video not ready yet');
        return;
      }

      objectDetector.detect(webcamRef.current.video, (err, results) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, width, height);
      
          results.forEach((detection) => {
            if (results[0].label === 'person' && results[0].confidence <= 0.8984394240379333) {
            ctx.beginPath();
            ctx.fillStyle = "#FF0000";
            const { label, x, y, width, height } = detection;
            ctx.fillText(label, x, y - 5);
            ctx.rect(x, y, width, height);
            ctx.stroke();
            const imageSrc = webcamRef.current.getScreenshot({ width: 224, height: 224 });
            const encodedString = imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
            setBase64(imageSrc);
        
            axios.post(baseURL, { base64: encodedString }, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            }).then((responce) => {
              console.log(responce.data.status)
              if (responce.data.status) {
                setStatus(responce.data.status)
                setData(responce.data.data)
                setInterval(() => {
                  window.location.reload()
                }, 10000)
              }
            }).catch((err) => {
              setError(err) 
              setStatus(null); // Mengatur status ke nilai default atau null
              setData(null);
              setTimeout(() => {
                window.location.reload();
              }, 5000); // Mengatur data ke nilai default atau null
            })
          }
          });
    
      });
    };

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    }

  }, [width, height]);

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>Pengenalan Wajah</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
              Home
            </Link>
            <Typography className={styles.breadUnactive}>Pengenalan Wajah</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.main}>
        {status === 201 ? (
          <div className={styles.mainTitle}>
            <h1 className={styles.mainTitleText}>Selamat Datang</h1>
            <h1 className={styles.mainTitleText}>Silahkan Masuk</h1>
          </div>
        ): error ?( 
        <div className={styles.mainTitle1}>
          <h1 className={styles.mainTitleText}>Selamat Datang</h1>
          <h1 className={styles.mainTitleText}>Mohon Maaf Anda Tidak Boleh Masuk Ruangan</h1>
        </div>
        ):(
          <div className={styles.mainTitle}>
            <h1 className={styles.mainTitleText}>Selamat Datang</h1>
            <h1 className={styles.mainTitleText}>Silahkan Scan Wajah dan Suhu Anda</h1>
          </div>
        )}
          <div className={styles.mainCamera}>
            {base64 === null ? (
              <>
               <canvas ref={canvasRef} className="canvas"/>
                <Webcam className={styles.mainwebcam}
                  audio={false}
                  mirrored={true}
                  height={300}
                  width={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                
                <Button className={styles.button} onClick={capture} variant="contained" component="label">
                  Ambil Gambar
                </Button>
              </>
            ) : (
              <>
                <img src={base64} alt="screenshot" /> <br />
                <Button className={styles.button} onClick={() => setBase64( window.location.reload())} variant="danger" component="label">Ambil Ulang</Button>
              </>
            )}
          </div>
          {status === 201 ? (
            <div>
              <div className={styles.mainDescription}>
                <div className={styles.mainDescLeft}>{data.suhu} <span>&#8451;</span></div>
                <div className={styles.mainDescRight}>
                  <p className={styles.descTop}>Suhu Tubuh Anda</p>
                  <p className={styles.descBottom}>{data.statusSuhu}</p>
                </div>
              </div> <br />
              <div className={styles.mainDescription}>
                <div className={styles.mainDescLeft}>{data.nama}</div>
              </div>
            </div>
          ) : error ? (
            <div className={styles.maineror}>
              <div className={styles.mainDesceror}><p>Suhu dan Wajah Anda Tidak Sesuai</p></div>
            </div>
          ) : (
            null
          )}



          {/* <div className={styles.mainTable}>
                        <Table columns={columns} dataSource={data} />
                    </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Start;
