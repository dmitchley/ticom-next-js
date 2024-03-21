import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import Link from "next/link";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}></div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h3 className={styles.title}>Tabletop Temporal Bone</h3>
          {/* <span className={styles.subtitle}>Takes 4 minutes to learn</span> */}
          <p className={styles.desc}>
            The Tabletop Temporal Bone is an aesthetically appealing piece that
            not only looks great but also offers an intricate display of
            temporal bone microanatomy.
          </p>
          <Link
            href="https://www.ticomlabs.com/product/temporal-bone-tabletop/"
            target="_new"
          >
            <button className={styles.button}>
              <MdReadMore />
              View
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}>🚀 Available Now</span>
          <h3 className={styles.title}>Surgical Simulation Temporal Bones!</h3>

          <p className={styles.desc}>
            Our Synthetic Otology Models are meticulously crafted to provide a
            close approximation to the surgical experience. They are designed to
            enhance surgical precision in otology.
          </p>
          <Link
            href="https://www.ticomlabs.com/product/temporal-bone-tabletop/"
            target="_new"
          >
            <button className={styles.button}>
              <MdReadMore />
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
