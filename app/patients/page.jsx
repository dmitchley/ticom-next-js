import styles from "../ui/dashboard/dashboard.module.css";

import Transactions from "../ui/patients/transactions/transactions";
import PatientConsent from "../ui/patients/consent/consent";
//import { fetchUsers } from "../lib/data";

const Dashboard = async () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Transactions />
        <PatientConsent />
      </div>
    </div>
  );
};

export default Dashboard;
