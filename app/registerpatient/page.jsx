"use client";

import Image from "next/image";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../ui/login/login.module.css"; // Ensure this path matches your CSS module for forms

const DoctorRegistrationForm = () => {
  const { push } = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: event.currentTarget.name.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      doctorCode: event.currentTarget.code.value,
      isDoctor: true,
    };

    //console.log(JSON.stringify(payload));

    try {
      const { data } = await axios.post("/api/auth/registerpatient", payload);

      //  alert(JSON.stringify(data));

      push("/dashboard");
    } catch (e) {
      const error = e;

      alert(error.message);
    }
  };

  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className={styles.logoContainer}>
        <Image
          className={styles.logoImage}
          src="/ticom.PNG"
          height="150"
          width="150"
          alt="Logo"
        />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input type="text" placeholder="Name" name="name" />
        <input type="text" placeholder="Email" name="email" />
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
        />

        <input
          type="text"
          placeholder="Unique Doctor Code"
          name="code"
          className={styles.inputField}
        />

        <button type="submit">Login</button>
        {/* {state && state} */}
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
