// "use client";

// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const { push } = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const payload = {
//       username: event.currentTarget.username.value,
//       password: event.currentTarget.password.value,
//     };

//     try {
//       const { data } = await axios.post("/api/auth/login", payload);

//       //  alert(JSON.stringify(data));

//       push("/dashboard");
//     } catch (e) {
//       const error = e;

//       alert(error.message);
//     }
//   };

//   return (
//     <main>
//       <h1>Nextjs authentication JWT verify http cookie only</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             required
//             className="border rounded border-black"
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             required
//             className="border rounded border-black"
//           />
//         </div>

//         <button
//           type="submit"
//           className="p-2 bg-orange-600 text-white w-fit rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </main>
//   );
// }

"use client";

import styles from "./ui/login/loginForm/loginForm.module.css";
import { useFormState } from "react-dom";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { push } = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);

      //  alert(JSON.stringify(data));

      push("/dashboard");
    } catch (e) {
      const error = e;

      alert(error.message);
    }
  };

  return (
    <>
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
          <input type="text" placeholder="email" name="email" />
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <button type="submit">Login</button>
          {/* {state && state} */}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
