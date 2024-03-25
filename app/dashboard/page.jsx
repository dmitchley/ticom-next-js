import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
//import { fetchUsers } from "../lib/data";

const Dashboard = async () => {
  // const user = await fetchUsers();

  // console.log(user);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
