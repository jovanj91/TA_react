import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";

function Dashboard() {

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>Dashboard</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
          <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                Home
              </Link>
            <Typography className={styles.breadUnactive}>Dashbord</Typography>
          </Breadcrumbs>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
