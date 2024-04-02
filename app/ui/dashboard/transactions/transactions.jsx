import Image from "next/image";
import styles from "./transactions.module.css";
import Link from "next/link";

// Assuming patientsData is passed correctly as a prop
const Transactions = ({ patientsData }) => {
  console.log(patientsData);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Patients</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Consent Status</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {patientsData.length > 0 ? (
            patientsData.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>
                  <span className={`${styles.status} ${styles.pending}`}>
                    Pending
                  </span>
                </td>
                <td>14.02.2024</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ backgroundColor: "#151c2c" }}>
                <h2>No patients</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
