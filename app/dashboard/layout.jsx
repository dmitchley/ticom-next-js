"use client";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import React from "react";

const Layout = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patients, setPatient] = useState([]);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      // const patients = await getDoctorPatients();

      // setPatient(patients);

      console.log(user);

      if (error) {
        push("/");
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;

async function getUser() {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e;

    return {
      user: null,
      error,
    };
  }
}

async function getDoctorPatients() {
  try {
    const { data } = await axios.get("/api/auth/doctorcontroller");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e;

    return {
      user: null,
      error,
    };
  }
}
