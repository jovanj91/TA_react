import React, { useState } from "react";
import { Skeleton } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./DashboardSidebarAdmin.module.css";
import {
  DashboardDark,
  DashboardColor,
  StatistikDark,
  StatistikColor,
  UserDark,
  UserColor,
  SettingLight,
  SettingDark,
  UserDark1,
  UserColor1,
} from "../../../assets/assets";


function DashboardSidebarAdmin() {
  let location = useLocation();
  const [loading, setLoading] = useState(false)

  return (
    <div className={styles.wrapper}>
      {
        loading ? <Skeleton /> : (

          <div className={styles.container}>
            {location.pathname === "/dashboardadmin" ? (
              <Link to="/dashboardadmin" className={styles.linkSidebarActive}>
                <img src={DashboardColor} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Dashboard Admin</h5>
              </Link>
            ) : (
              <Link to="/dashboardadmin" className={styles.linkSidebar}>
                <img src={DashboardDark} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Dashboard Admin</h5>
              </Link>
            )}

            {location.pathname.slice(0, 11) === "/tampilwajah" ? (
              <Link to="/tampilwajah" className={styles.linkSidebarActive}>
                <img src={UserColor1} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Tampil Wajah</h5>
              </Link>
            ) : (
              <Link to="/tampilwajah" className={styles.linkSidebar}>
                <img src={UserDark1} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Tampil Wajah</h5>
              </Link>
            )}

            <>
              {location.pathname.slice(0, 6) === "/tampilpengunjung" ? (
                <Link to="/tampilpengunjung" className={styles.linkSidebarActive}>
                  <img src={StatistikColor} alt="icon sidebar" className={styles.iconSidebar} />
                  <h5 className={styles.textColor}>Tampil Pengunjung</h5>
                </Link>
              ) : (
                <Link to="/tampilpengunjung" className={styles.linkSidebar}>
                  <img src={StatistikDark} alt="icon sidebar" className={styles.iconSidebar} />
                  <h5 className={styles.text}>Tampil Pengunjung</h5>
                </Link>
              )}
            </>

            {location.pathname.slice(0, 7) === "/tampiluser" ? (
              <Link to="/tampiluser" className={styles.linkSidebarActive}>
                <img src={SettingLight} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Tampil User</h5>
              </Link>
            ) : (
              <Link to="/tampiluser" className={styles.linkSidebar}>
                <img src={SettingDark} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Tampil User</h5>
              </Link>
            )}

            {/* <>
              {location.pathname.slice(0, 10) === "/device" ? (
                <Link to="/device" className={styles.linkSidebarActive}>
                  <img src={UserColor} alt="icon sidebar" className={styles.iconSidebar} />
                  <h5 className={styles.textColor}>Device</h5>
                </Link>
              ) : (
                <Link to="/device" className={styles.linkSidebar}>
                  <img src={UserDark} alt="icon sidebar" className={styles.iconSidebar} />
                  <h5 className={styles.text}>Device</h5>
                </Link>
              )}
            </> */}
          </div>


        )
      }
    </div>
  );
}

export default DashboardSidebarAdmin;
