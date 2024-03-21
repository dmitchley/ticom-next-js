"use client";

//import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Image from "next/image";

const LoginForm = () => {
  //const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Make sure this is included to center-align all children
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

        <form className={styles.form}>
          <h1>Login</h1>
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password" />
          <button>Login</button>
          {/* {state && state} */}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
