// "use client";
// import Navbar from "../ui/patients/navbar/navbar";
// import Sidebar from "../ui/dashboard/sidebar/sidebar";
// import styles from "../ui/dashboard/dashboard.module.css";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios";

// const Layout = ({ children }) => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const { push } = useRouter();

//   useEffect(() => {
//     (async () => {
//       const { user, error } = await getUser();

//       console.log("user: " + JSON.stringify(user));

//       // console.log("error: " + error);

//       if (error) {
//         push("/");
//         return;
//       }

//       setIsSuccess(true);
//     })();
//   }, [push]);

//   if (!isSuccess) {
//     return <></>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <Navbar />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;

// async function getUser() {
//   try {
//     const { data } = await axios.get("/api/auth/me");

//     return {
//       user: data,
//       error: null,
//     };
//   } catch (e) {
//     const error = e;

//     return {
//       user: null,
//       error,
//     };
//   }
// }

"use client";
import Navbar from "../ui/patients/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { push, asPath } = useRouter(); // Use asPath to get the current path

  const pathname = usePathname();

  console.log(pathname);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      console.log("user: " + JSON.stringify(user));

      if (error) {
        push("/");
        return;
      }

      setIsSuccess(true);

      // Check if the current path is /patients or starts with /patients/
      if (pathname === "/patients") {
        // Call the API to log the visit
        axios
          .post("/api/auth/logvisit", {
            page: pathname,
            timestamp: new Date().toISOString(),
          })
          .catch((error) =>
            console.error("Error logging visit:", error.response.data)
          );
      }
    })();
  }, [push, asPath]); // Add asPath to the dependency array

  if (!isSuccess) {
    return <></>;
  }

  return (
    <div className={styles.container}>
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
    return { user: data, error: null };
  } catch (e) {
    return { user: null, error: e };
  }
}
