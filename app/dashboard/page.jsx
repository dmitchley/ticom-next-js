"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
//import { fetchUsers } from "../lib/data";

const Dashboard = () => {
  // Using useState to manage patients state
  const [patientsData, setPatientsData] = useState("");

  // Fetch patients data on client side when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/auth/doctorcontroller");

        setPatientsData(response.data.patients);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []); // Empty dependency array means this runs once on mount

  // console.log(JSON.stringify(patientsData));

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Transactions patientsData={patientsData} />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
