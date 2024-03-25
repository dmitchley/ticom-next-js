"use client";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

const Layout = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchAdminData = async () => {
  //     setLoading(true);

  //     try {
  //       const response = await axios.get("/api/auth/admin");
  //       console.log(response);
  //       setData(response.data);
  //       setError("");
  //     } catch (error) {
  //       console.error("Failed to fetch admin data:", error);
  //       push("/patients");
  //       setError(
  //         "Failed to fetch admin data. Please make sure you are logged in as an admin."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAdminData();
  // }, []);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      console.log("user: " + JSON.stringify(user));

      // console.log("error: " + error);

      if (error) {
        push("/");
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  // if (data === null) {
  //   return <></>;
  // }

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
