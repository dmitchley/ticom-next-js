"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { MdOutlineChat, MdPublic, MdSearch, MdExitToApp } from "react-icons/md";
import axios from "axios";

const navbar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showPopout, setShowPopout] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Make sure to create this API route
      window.location.href = "/"; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <MdExitToApp
            size={20}
            onClick={() => setShowPopout(!showPopout)}
            className={styles.logoutIcon}
          />
          {showPopout && (
            <div className={styles.popout}>
              <button onClick={handleLogout} className={styles.popoutButton}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default navbar;
