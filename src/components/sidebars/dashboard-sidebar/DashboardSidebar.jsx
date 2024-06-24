import React, { useState } from "react";
import { Skeleton } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./DashboardSidebar.module.css";
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


function DashboardSidebar() {
  let location = useLocation();
  const [loading, setLoading] = useState(false)

  return (
    <div className={styles.wrapper}>
      {
        loading ? <Skeleton /> : (

          <div className={styles.container}>
            {location.pathname === "/dashboard" ? (
              <Link to="/dashboard" className={styles.linkSidebarActive}>
                <img src={DashboardColor} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Dashboard</h5>
              </Link>
            ) : (
              <Link to="/dashboard" className={styles.linkSidebar}>
                <img src={DashboardDark} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Dashboard</h5>
              </Link>
            )}

            {location.pathname.slice(0, 11) === "/face-train" ? (
              <Link to="/face-train" className={styles.linkSidebarActive}>
                <img src={UserColor1} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Daftar Wajah</h5>
              </Link>
            ) : (
              <Link to="/face-train" className={styles.linkSidebar}>
                <img src={UserDark1} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Daftar Wajah</h5>
              </Link>
            )}

            <>
              {location.pathname.slice(0, 6) === "/start" ? (
                <Link to="/start" className={styles.linkSidebarActive}>
                  <img src={StatistikColor} alt="icon sidebar" className={styles.iconSidebar} />
                  <h5 className={styles.textColor}>Pengenalan Wajah</h5>
                </Link>
              ) : (
                <Link to="/start" className={styles.linkSidebar}>
                  <img src={StatistikDark} alt="icon sidebar" className={styles.iconSidebar} />
                  <h5 className={styles.text}>Pengenalan Wajah</h5>
                </Link>
              )}
            </>

            {location.pathname.slice(0, 7) === "/report" ? (
              <Link to="/report" className={styles.linkSidebarActive}>
                <img src={SettingLight} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Report</h5>
              </Link>
            ) : (
              <Link to="/report" className={styles.linkSidebar}>
                <img src={SettingDark} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Report</h5>
              </Link>
            )}

            <>
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
            </>
          </div>


        )
      }
    </div>
  );
}

export default DashboardSidebar;
