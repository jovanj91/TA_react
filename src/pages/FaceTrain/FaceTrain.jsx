import React, { useCallback, useRef, useState, useEffect } from "react";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Navigate, Link } from "react-router-dom";
import styles from "./FaceTrain.module.css";
import Button from '@mui/material/Button'; 
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import Webcam from "react-webcam";
import axios from "axios";
const baseURL = "http://localhost:3000/datawajah/kirim";
function FaceTrain() {
  const token = localStorage.getItem("token");

  const [base64, setBase64] = useState(null);
  const [data, setData] = useState("");
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/datawajah/lihat`,{
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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({ width:224, height:224});
    const encodedString = imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    setBase64(imageSrc);
    console.log(encodedString)
    axios.post(baseURL, { base64: encodedString }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((responce)=>(
      setTimeout(()=>{
        window.location.reload()
      }, 2000)

    ))
  }, [webcamRef]);

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
          <h2 className={styles.pageTitle}>Daftar Wajah</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
          <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                Home
              </Link>
            <Typography className={styles.breadUnactive}>Daftar Wajah</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.main}>
          <div className={styles.mainTitle}>
            <h1 className={styles.mainTitleText}>Selamat Datang</h1>
            <h1 className={styles.mainTitleText}>Silahkan Daftar Wajah Anda</h1>
          </div>
          <div className={styles.mainCamera}>
            {base64 === null ? (
              <>
                <Webcam className={styles.mainwebcam}
                  audio={false}
                  mirrored={true}
                  height={300}
                  width={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                /> <br />
                <Button className={styles.button} onClick={capture} variant="contained" component="label">
                  Ambil Gambar
                </Button>
              </>
            ) : (
              <>
                <img src={base64} alt="screenshot" /> <br />
                <Button className={styles.button} onClick={() => setBase64(null)}  variant="danger" component="label">Ambil Ulang</Button>
              </>
            )}
          </div>
          <div className="container">
          <div className="row">
            <div className="card">
          <h2 className={styles.pageTitle1}>Hasil Data Wajah</h2> <br />
            <MDBTable align='middle'>
              <MDBTableHead>
                <tr>
                  <th scope='col'>No</th>
                  <th scope='col'>Nama</th>
                  <th scope='col'>Gambar</th>
                  <th scope='col'>Aksi</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                
            {/* { data !== null &&
              <>
                {
                  data.map((temp, index) => {
                    <div key={index}>
                    {
                      
                    temp.fotowajahs.map((temp1, index) => {
                      return (
                        <div key={index}>
                          <tr>
                            <td>
                              <p className='fw-normal'>{index + 1}</p>
                            </td>
                            <td>
                              <p className='fw-normal'>{temp.nama}</p>
                            </td>
                            <td>
                          
                            <img
                                  src={"data:image/jpeg;base64," + temp1.base64}
                                  alt=''
                                  style={{ width: '70px', height: '70px' }}
                                  className='rounded-circle'
                                />
                            </td>
                            <td>
                            <Button 
                              style={{ textDecoration: 'none', color: '#29325d' }} 
                              className="col-sm col-md-3 col-lg-3 shadow-sm border-1 border rounded-2 border-secondary px-2 mx-3 py-2 d-flex gap-2 align-items-center my-3 justify-content-center"
                              >
                                Delete
                            </Button>
                            </td>
                          </tr>
                        </div>
                      )
                    })
                    }
                    </div>
                  })
                }
              </>
            } */}
              { data && data.map((temp) => (
                    temp.fotowajahs.map((temp1, index)=>( 
                <tr key={temp1.id}>
                  <td>
                    <p className='fw-normal'>{index + 1}</p>
                  </td>
                  <td>
                    <p className='fw-normal'>{temp.nama}</p>
                  </td>
                  <td>
                
                  <img
                        src={"data:image/jpeg;base64," + temp1.base64}
                        alt=''
                        style={{ width: '70px', height: '70px' }}
                        className='rounded-circle'
                      />
                  </td>
                  <td>
                  <Button 
                  
                    key ={temp.fotowajahs.id} 
                    variant="contained" color="error"
                    className="col-sm col-md-3 col-lg-3 shadow-sm border-1 border rounded-2 border-secondary px-2 mx-3 py-2 d-flex gap-2 align-items-center my-3 justify-content-center"
                    onClick={(e) => onDelete(e, temp1.id)}
                    >
                      Delete
                  </Button>
                  
                  </td>
                </tr>
                ))
                ))}
              </MDBTableBody>
              {/* <MDBTableBody>
              { data && data.map((temp) => (
                    temp.fotowajahs.map((temp1, index)=>( 
                <tr key={temp1.id}>
                  <td>
                    <p className='fw-normal'>{index + 1}</p>
                  </td>
                  <td>
                    <p className='fw-normal'>{temp.nama}</p>
                  </td>
                  <td>
                
                  <img
                        src={"data:image/jpeg;base64," + temp1.base64}
                        alt=''
                        style={{ width: '70px', height: '70px' }}
                        className='rounded-circle'
                      />
                  </td>
                  <td>
                  <Button 
                    style={{ textDecoration: 'none', color: '#29325d' }} 
                    key ={temp1.id} 
                    className="col-sm col-md-3 col-lg-3 shadow-sm border-1 border rounded-2 border-secondary px-2 mx-3 py-2 d-flex gap-2 align-items-center my-3 justify-content-center"
                    onClick={onDelete(temp1.id)}
                    >
                      Delete
                  </Button>
                  </td>
                </tr>
                ))
                ))}
              </MDBTableBody> */}
            </MDBTable>
            </div>
    </div>
      </div>
        </div>
      </div>
    </DashboardLayout>  
  );
}

export default FaceTrain;
