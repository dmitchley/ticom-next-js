import Image from "next/image";
import styles from "./transactions.module.css";
import Link from "next/link";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Patients</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Consent Status</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link href="John Doe">
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  John Doe
                </div>
              </Link>
            </td>
            <td>
              <Link href="John Doe">
                <span className={`${styles.status} ${styles.done}`}>
                  Consented
                </span>
              </Link>
            </td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                Consented
              </span>
            </td>
            <td>14.02.2024</td>
          </tr>

          <tr>
            <td>
              <Link href="John Doe">
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  John Doe
                </div>
              </Link>
            </td>
            <td>
              <Link href="John Doe">
                <span className={`${styles.status} ${styles.done}`}>
                  Consented
                </span>
              </Link>
            </td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                Consented
              </span>
            </td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>14.02.2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
