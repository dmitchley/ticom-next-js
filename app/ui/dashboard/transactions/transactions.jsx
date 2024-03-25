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
          {patientsData.map((patient) => (
            <tr key={patient._id}>
              <td> {patient.name}</td>
              <td>{patient.email}</td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  Pending
                </span>
              </td>
              <td>14.02.2024</td>
            </tr>
          ))}
          {/* {patientsData.map((patient, index) => (
            <tr key={index}>
              <td>
                <Link href={`/patient/${encodeURIComponent(patient.name)}`}>
                  <a className={styles.user}>
                    <Image
                      src="/noavatar.png"
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {patient.name}
                  </a>
                </Link>
              </td>
              <td>{patient.email}</td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  Pending
                </span>
              </td>
              <td>14.02.2024</td>{" "}
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
